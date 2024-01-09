// Local Imports
import { PlayedNote } from './played-note';

export class PlaybackStyle {
  /**
   * Unique Id of playback style.
   */
  _id: string;

  /**
   * Name of playback style.
   */
  _name: string;

  /**
   * Keys played in section in sequence.
   */
  _playback: PlayedNote[];

  constructor(
    id: string,
    name: string,
    playback = [] as PlayedNote[],
  ) {
    this._id = id;
    this._name = name;
    this._playback = playback;
  }

  /**
   * Retrieves the unique Id of the playback style.
   *
   * @returns {string} Unique Id of the playback style.
   */
  getId(): string {
    return this._id;
  }

  /**
   * Retrieves the name of the playback style.
   *
   * @returns {string} Name of the playback style.
   */
  getName(): string {
    return this._name;
  }

  /**
   * Retrieves the keys played in section in sequence.
   *
   * @returns {PlayedNote[]} Keys played in section in sequence.
   */
  getPlayback(): PlayedNote[] {
    return this._playback;
  }
}
