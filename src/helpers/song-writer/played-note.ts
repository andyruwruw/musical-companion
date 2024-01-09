// Local Imports
import { NOTES } from '../../config/chords';

export class PlayedNote {
  /**
   * The timing to play the note (in quarter notes).
   */
  _time: number;

  /**
   * Note played from chord in it's listings.
   *
   * @type {number}
   */
  _note: number;

  /**
   * How long to hold the note (in quarter notes).
   *
   * @type {number}
   */
  _duration: number;

  /**
   * Whether to play the note if not available.
   */
  _required: boolean;

  constructor(
    time: number,
    note: number,
    duration: number,
    required = true,
  ) {
    this._time = time;
    this._note = note;
    this._duration = duration;
    this._required = required;
  }

  /**
   * The timing to play the note (in quarter notes).
   *
   * @returns {number} The timing to play the note (in quarter notes).
   */
  getTime(): number {
    return this._time;
  }

  /**
   * Note played from chord in it's listings.
   *
   * @returns {string} Note played from chord in it's listings.
   */
  getNote(): number {
    return this._note;
  }
}
