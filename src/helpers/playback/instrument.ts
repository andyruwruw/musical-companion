// Packages
import * as Tone from 'tone';

// Local Imports
import {
  INSTRUMENTS,
  InstruemntType,
} from '../../config/instruments';
import { Deferred } from '../deferred';
import { HAS_OCTIVE } from '../../config/chords';

export class Instrument {
  /**
   * References to deferred promises.
   *
   * @type {Record<number, Deferred>}
   */
  static loader: Record<number, Deferred> = {};

  /**
   * Number of instruments.
   *
   * @type {number}
   */
  static counter = 0;

  /**
   * Id of the instrument.
   *
   * @type {number}
   */
  _id: number;

  /**
   * Type of instrument in use.
   *
   * @type {InstruemntType}
   */
  _type: InstruemntType;

  /**
   * Instance of the sampler used.
   *
   * @type {null | Tone.Sampler}
   */
  _sampler: null | Tone.Sampler;

  /**
   * Whether the instrument is loading.
   *
   * @type {boolean}
   */
  _loading = false;

  /**
   * Whether the instrument is ready to play.
   *
   * @type {boolean}
   */
  _ready = false;

  constructor(
    type = 'piano' as InstruemntType,
    sampler = null,
  ) {
    Instrument.counter += 1;
    this._id = Instrument.counter;

    this._type = type;
    this._sampler = sampler;
  }

  /**
   * Loads the sampler with required samples.
   */
  async load(): Promise<void> {
    if (this._loading) {
      await Instrument.loader[this._id].isResolved();
      return;
    }

    this._loading = true;

    Instrument.loader[this._id] = new Deferred();
    const id = this._id;

    const config = INSTRUMENTS[this._type];
    const urls = config.notes.reduce((acc, note) => ({
      ...acc,
      [note.replace('s', '#').replace('♯', '#')]: `${note}.mp3`,
    }), {});

    this._sampler = new Tone.Sampler({
      urls,
      release: 1,
      baseUrl: `/media/${this._type}/`,
      onload() {
        Instrument.loader[id].resolve();
      },
      onerror(error) {
        console.log(error);
        Instrument.loader[id].reject();
      },
    }).toDestination();

    await Instrument.loader[this._id].isResolved();

    this._ready = true;
    this._loading = false;
  }

  /**
   * Whether the sampler is loaded and ready.
   *
   * @returns {boolean} Whether the sampler is loaded and ready.
   */
  isLoaded(): boolean {
    return this._ready;
  }

  /**
   * Changes the instrument.
   *
   * @param {InstruemntType} type New instrument type.
   */
  changeInstrument(type: InstruemntType) {
    this._type = type;

    this.load();
  }

  /**
   * Plays a note.
   *
   * @param {Note} note Note to play.
   * @param {Time} time How long to play it.
   * @param {number} velocity Velocity of note.
   * @returns {Promise<void>}
   */
  async keyDown(
    note: Tone.Unit.Frequency | Tone.Unit.Frequency[],
    time = undefined as undefined | Tone.Unit.Time,
    velocity = undefined as undefined | number,
  ): Promise<void> {
    if (this._sampler === null) {
      return;
    }

    console.log('pre sanitized', note);

    const sanitized = this.sanitizeNote(note);

    console.log('sanitized', sanitized);

    this._sampler.triggerAttack(
      this.sanitizeNote(note),
      time,
      velocity,
    );
  }

  /**
   * Stops playing a note..
   *
   * @param {Note} note Note to play.
   * @param {Time} time How long to play it.
   * @returns {Promise<void>}
   */
  async keyUp(
    note: Tone.Unit.Frequency | Tone.Unit.Frequency[],
    time = undefined as undefined | Tone.Unit.Time,
  ): Promise<void> {
    if (this._sampler === null) {
      return;
    }

    console.log('pre sanitized', note);

    const sanitized = this.sanitizeNote(note);

    console.log('sanitized', sanitized);

    this._sampler.triggerRelease(
      this.sanitizeNote(note),
      time,
    );
  }

  /**
   * Takes notes an ensures they're playable.
   *
   * @param {Tone.Unit.Frequency[]} notes Notes to be played
   */
  sanitizeNote(note: Tone.Unit.Frequency | Tone.Unit.Frequency[]):Tone.Unit.Frequency | Tone.Unit.Frequency[] {
    if (note instanceof Array) {
      return this.sanitizeNotes(note);
    }

    if (HAS_OCTIVE.test(note as string)) {
      return (note as string).replace('♯', '#');
    }
    return `${note}${INSTRUMENTS[this._type].center}`.replace('♯', '#');
  }

  /**
   * Takes notes an ensures they're playable.
   *
   * @param {Tone.Unit.Frequency[]} notes Notes to be played
   */
  sanitizeNotes(notes: Tone.Unit.Frequency[]): Tone.Unit.Frequency[] {
    const sanitized = [] as Tone.Unit.Frequency[];

    for (let i = 0; i < notes.length; i += 1) {
      sanitized.push(this.sanitizeNote(
        notes[i],
      ) as Tone.Unit.Frequency);
    }

    return sanitized;
  }
}
