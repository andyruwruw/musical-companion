// Local Imports
import { Chord } from './chord';

export class SongSectionVariation {
  /**
   * Identifier.
   */
  _id: number;

  /**
   * Number of bars in section.
   */
  _bars: number;

  /**
   * Keys played in section in sequence.
   */
  _chords = {
  } as Record<number, Chord>;

  constructor(
    id: number,
    chords: Record<number, Chord> = {},
    bars = 4,
  ) {
    this._id = id;
    this._chords = Object.keys(chords).length ? chords : {
      0: new Chord(0, 0, 'maj', 0, 1),
      1: new Chord(1, 5, 'maj', 1, 2),
      2: new Chord(2, 7, 'maj', 2, 3),
      3: new Chord(3, 4, 'min', 3, 4),
    } as Record<number, Chord>;
    this._bars = bars;
  }

  /**
   * Retrieves the Id of the variation.
   *
   * @returns {number} Id of the variation.
   */
  getId(): number {
    return this._id;
  }

  /**
   * Adds a chord played.
   *
   * @param {Chord} chord Chord played (from root).
   * @returns {number} Chord Id..
   */
  addChord(chord: Chord): number {
    const ids = Object.keys(this._chords).map((id: string) => parseInt(id, 10));
    let id = 0;

    while (ids.includes(id)) {
      id += 1;
    }

    this._chords[id] = chord;

    return id;
  }

  /**
   * Retrieves the chords played.
   *
   * @returns {Record<number, Chord>} Chords played.
   */
  getChords(): Record<number, Chord> {
    return this._chords;
  }

  /**
   * Retrieves the chords played in order.
   *
   * @returns {Chord[]} Chords played in order.
   */
  getChordsOrdered(): Chord[] {
    return Object.values(this._chords).sort((
      a: Chord,
      b: Chord,
    ) => (a.getStart() - b.getStart()));
  }

  /**
   * Retrieves a chord by Id.
   *
   * @returns {Chord} Chord requested.
   */
  getChord(id: number): Chord {
    return this._chords[id];
  }

  /**
   * Retrieves chord before selected.
   *
   * @param {string} id Id of the chord.
   * @returns {Chord} Previous chord to this.
   */
  getPreviousChord(id: number): Chord | null {
    const chords = this.getChordsOrdered();

    let last = null;

    for (let i = 0; i < chords.length; i += 1) {
      if (chords[i].getId() === id) {
        break;
      }

      last = chords[i];
    }

    return last;
  }

  /**
   * Removes a chord from the section.
   *
   * @param {number} id Id of chord to remove.
   */
  removeChord(id: number): void {
    delete this._chords[id];
  }

  /**
   * Retrieves number of bars in section.
   *
   * @returns {number} Number of bars in section.
   */
  getBars(): number {
    return this._bars;
  }

  /**
   * Sets the number of bars in section.
   *
   * @param {number} bars Number of bars in section.
   */
  setBars(bars: number): void {
    this._bars = bars;
  }

  /**
   * Updates the time signature.
   *
   * @param {number} segments Number of segments per bar.
   */
  updateTimeSignature(segments: number): number {
    const chords = this.getChordsOrdered();

    let last = 0;

    for (let i = 0; i < chords.length; i += 1) {
      chords[i].setStart(SongSectionVariation._realignTime(
        chords[i].getStart(),
        segments,
        last,
        true,
      ));

      chords[i].setEnd(SongSectionVariation._realignTime(
        chords[i].getEnd(),
        segments,
        chords[i].getStart(),
        false,
      ));

      if (chords[i].getStart() === -1
        || chords[i].getEnd() === -1) {
        delete this._chords[chords[i].getId()];
        continue;
      }

      last = chords[i].getEnd();
    }

    return 0;
  }

  /**
   * Preview pulling a chord's end.
   *
   * @param {number} chordId Chord Id to pull.
   * @param {number} end Ending bar.
   */
  previewPullChordRight(
    chordId: number,
    end: number,
  ): void {
    const chord = this.getChord(chordId);

    let bar = end;
    if (end > this._bars) {
      bar = this._bars;
    }
    if (end < 0) {
      bar = 0;
    }

    if (chord) {
      chord.setEnd(bar);
    }
  }

  /**
   * Pull a chord's end.
   *
   * @param {number} chordId Chord Id to pull.
   * @param {number} end Ending bar.
   */
  pullChordRight(
    chordId: number,
    end: number,
  ): void {
    const chord = this.getChord(chordId);

    if (chord.getStart() >= chord.getEnd()) {
      delete this._chords[chordId];
      return;
    }

    this._reorderBasedOnChordShift(chord);
  }

  /**
   * Preview pulling a chord's start.
   *
   * @param {number} chordId Chord Id to pull.
   * @param {number} start Starting bar.
   */
  previewPullChordLeft(
    chordId: number,
    start: number,
  ): void {
    const chord = this.getChord(chordId);

    let bar = start;
    if (start > this._bars) {
      bar = this._bars;
    }
    if (start < 0) {
      bar = 0;
    }

    if (chord) {
      chord.setStart(bar);
    }
  }

  /**
   * Pull a chord's start.
   *
   * @param {number} chordId Chord Id to pull.
   * @param {number} start Starting bar.
   */
  pullChordLeft(
    chordId: number,
    start: number,
  ): void {
    const chord = this.getChord(chordId);

    if (chord.getStart() >= chord.getEnd()) {
      delete this._chords[chordId];
      return;
    }

    this._reorderBasedOnChordShift(chord);
  }

  /**
   * Realigns a time to a new time signature.
   *
   * @param {number} time Location of the time to change.
   * @param {number} segments Number of segments now.
   * @param {number} last Last time stamp.
   * @param {number} next Next time stamp.
   * @param {boolean} isStart Whether this is a starting time.
   * @returns {number} New time.
   */
  static _realignTime(
    time: number,
    segments: number,
    last: number,
    isStart: boolean,
  ): number {
    const bar = Math.floor(time);
    const segment = time - bar;

    if (segment === 0) {
      return bar;
    }

    const best = Math.round(segment * segments) / segments;

    if (!isStart && best === last) {
      const oneSegment = (1 / segments);

      if (best + oneSegment > 1) {
        return -1;
      }

      return bar + best + oneSegment;
    }

    if (best < last) {
      return -1;
    }

    return bar + best;
  }

  /**
   * Adjust other conflicing chords based on the new.
   * @param {Chord} chord Chord changed.
   */
  _reorderBasedOnChordShift(chord: Chord) {
    const chords = this.getChordsOrdered();

    for (let i = 0; i < chords.length; i += 1) {
      if (chords[i].getId() === chord.getId()) {
        continue;
      }

      if (chords[i].getStart() >= chord.getStart()
        && chords[i].getStart() < chord.getEnd()
        && chords[i].getEnd() > chord.getStart()
        && chords[i].getEnd() <= chord.getEnd()) {
        delete this._chords[chords[i].getId()];
        continue;
      }

      if (chords[i].getStart() < chord.getEnd()
        && chords[i].getEnd() >= chord.getEnd()) {
        const start = chord.getEnd();

        if (start > this._bars
          || start === chords[i].getEnd()) {
          delete this._chords[chords[i].getId()];
          continue;
        }
        chords[i].setStart(start);
      }

      if (chords[i].getEnd() > chord.getStart()
        && chords[i].getStart() <= chord.getStart()) {
        const end = chord.getStart();

        if (end < 0
          || end === chords[i].getEnd()) {
          delete this._chords[chords[i].getId()];
          continue;
        }
        chords[i].setEnd(end);
      }
    }
  }
}
