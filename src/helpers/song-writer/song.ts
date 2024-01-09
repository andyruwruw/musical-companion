// Local Imports
import { getName } from '../name';
import { SongSectionVariation } from './song-section-variation';
import { SongSection } from './song-section';
import { NOTE_MAP } from '../../config/chords';

export class Song {
  /**
   * Song ID.
   */
  _id: string;

  /**
   * Name of the song.
   */
  _name = getName();

  /**
   * Root key of the song.
   */
  _root = 'C';

  /**
   * Mode of the song.
   */
  _mode = 'maj';

  /**
   * Song tempo.
   */
  _bpm = 70;

  /**
   * Song time signature.
   */
  _timeSignature = '4/4';

  /**
   * Song section variations by ID.
   */
  _variations = {
    0: new SongSectionVariation(0),
  } as Record<string, SongSectionVariation>;

  /**
   * Sections of the timeline.
   */
  _timeline = [
    new SongSection(0),
  ] as SongSection[];

  constructor(id: string) {
    this._id = id;
  }

  /**
   * Retrieves the Id of the song.
   *
   * @returns {string} Id of the song.
   */
  getId(): string {
    return this._id;
  }

  /**
   * Retrieves the name of the song.
   *
   * @returns {string} Name of the song.
   */
  getName(): string {
    return this._name;
  }

  /**
   * Sets the song mode.
   *
   * @param {string} mode New song mode.
   */
  setMode(mode: string): void {
    this._mode = mode;
  }

  /**
   * Retrieves the mode of the song.
   *
   * @returns {string} mode of the song.
   */
  getMode(): string {
    return this._mode;
  }

  /**
   * Sets the song name.
   *
   * @param {string} name New song name.
   */
  setName(name: string): void {
    this._name = name;
  }

  /**
   * Retrieves the root of the song.
   *
   * @returns {string} Root of the song.
   */
  getRoot(): string {
    return this._root;
  }

  /**
   * Retrieves the root of the song.
   *
   * @returns {number} Root of the song.
   */
  getRootKey(): number {
    return NOTE_MAP[this._root];
  }

  /**
   * Sets the song root.
   *
   * @param {string} root New song root.
   */
  setRoot(root: string): void {
    this._root = root;
  }

  /**
   * Retrieves the BPM of the song.
   *
   * @returns {number} BPM of the song.
   */
  getBpm(): number {
    return this._bpm;
  }

  /**
   * Sets the song BPM.
   *
   * @param {number | string} bpm New song BPM.
   */
  setBpm(bpm: number | string): void {
    this._bpm = typeof bpm === 'string' ? parseInt(bpm, 10) : bpm;
  }

  /**
   * Retrieves the time signature of the song.
   *
   * @returns {string} Time signature of the song.
   */
  getTimeSignature(): string {
    return this._timeSignature;
  }

  /**
   * Retrieves the number of times to split a bar.
   *
   * @returns {number} Number of times to split a bar.
   */
  getBarSplit(): number {
    const elements = this._timeSignature.split('/');

    return elements.length ? parseInt(elements[0], 10) : 1;
  }

  /**
   * Sets the song time signature.
   *
   * @param {string} timeSignature New song time signature.
   */
  setTimeSignature(timeSignature: string): void {
    const segments = parseInt(timeSignature.split('/')[0], 10);

    if (!(/^\d+[/\\]+\d+$/g.test(timeSignature))
      || segments <= 0
      || segments > 16) {
      return;
    }

    this._timeSignature = timeSignature;

    const variations = Object.values(this.getSectionVariations());

    for (let i = 0; i < variations.length; i += 1) {
      variations[i].updateTimeSignature(this.getBarSplit());
    }
  }

  /**
   * Retrieves the sections of the timeline.
   *
   * @returns {Record<string, SongSectionVariation>} Sections of the timeline.
   */
  getSectionVariations(): Record<string, SongSectionVariation> {
    return this._variations;
  }

  /**
   * Retrieves a given section variation.
   *
   * @param {number} id Section variation Id.
   * @returns {SongSectionVariation} Song section variation.
   */
  getSectionVariation(id: number): SongSectionVariation {
    return this._variations[id];
  }

  /**
   * Retrieves the timeline.
   *
   * @returns {SongSection[]} Timeline.
   */
  getTimeline(): SongSection[] {
    return this._timeline;
  }

  /**
   * Retrieves a section of the timeline.
   *
   * @param {number} index Index of section.
   * @returns {SongSection} Section of the timeline.
   */
  getTimlineSection(index: number): SongSection {
    return this._timeline[index];
  }
}
