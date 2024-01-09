// Local Imports
import {
  CHORDS,
  NOTE_MAP,
} from '../../config/chords';

// Types
import { ChordType } from '../../types';

/**
 * Chord class.
 */
export class Chord {
  /**
   * Id of the chords.
   */
  _id: number;

  /**
   * Key played (from root).
   */
  _key: number;

  /**
   * Type of chord.
   */
  _type: ChordType;

  /**
   * What bar to start the chord.
   */
  _start: number;

  /**
   * What bar to end the chord.
   */
  _end: number;

  constructor(
    id: number,
    key: number,
    type: ChordType,
    start = 0,
    end = 0,
  ) {
    this._id = id;
    this._key = key;
    this._type = type;
    this._start = start;
    this._end = end;
  }

  /**
   * Retrieves Id for chord.
   *
   * @returns {number} Chord Id.
   */
  getId(): number {
    return this._id;
  }

  /**
   * Sets the Id for the chord for this section.
   *
   * @param {number} id Chord Id.
   */
  setId(id: number): void {
    this._id = id;
  }

  /**
   * Retrieves the key of the chord.
   *
   * @param {number} root Root of the chord.
   * @returns {number} Key of the chord.
   */
  getKey(root = 0): number {
    return (this._key + root) % 12;
  }

  /**
   * Sets the key of the chord.
   *
   * @param {number | string} key Key of the chord.
   */
  setKey(key: number | string): void {
    if (typeof key === 'string') {
      this._key = NOTE_MAP[key as string];
      return;
    }
    this._key = key % 12;
  }

  /**
   * Retrieves the starting bar of the chord.
   *
   * @returns {number} Starting bar of the chord.
   */
  getStart(): number {
    return this._start;
  }

  /**
   * Sets the starting bar of the chord.
   *
   * @param {number} start Starting bar of the chord.
   */
  setStart(start: number): void {
    this._start = start;
  }

  /**
   * Retrieves the ending bar of the chord.
   *
   * @returns {number} Ending bar of the chord.
   */
  getEnd(): number {
    return this._end;
  }

  /**
   * Sets the ending bar of the chord.
   *
   * @param {number} end Ending bar of the chord.
   */
  setEnd(end: number): void {
    this._end = end;
  }

  /**
   * Retrieves the duration of the chord.
   *
   * @returns {number} Duration of the chord.
   */
  getDuration(): number {
    return this._end - this._start;
  }

  /**
   * Retrieves the type of the chord.
   *
   * @returns {ChordType} Type of the chord.
   */
  getType(): ChordType {
    return this._type;
  }

  /**
   * Sets the type of the chord.
   *
   * @param {ChordType} type Type of the chord.
   */
  setType(type: ChordType): void {
    this._type = type;
  }

  /**
   * Retrieves the pitch class of the chord.
   *
   * @returns {number[]} Pitch class of the chord.
   */
  getPitchClass(): number[] {
    return CHORDS[this._type as ChordType].pitchClass;
  }
}
