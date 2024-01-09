// Local Imports
import { Song } from './song';

export class SongWriter {
  /**
   * Static list of songs being written.
   */
  static songs: Record<string, Song> = {};

  /**
   * Retrieves a song by Id.
   *
   * @param {string} id Song ID.
   */
  static getSong(id: string): Song {
    return SongWriter.songs[id];
  }

  /**
   * Checks if a song Id is present.
   *
   * @param {string} id Song ID.
   * @returns {boolean} True if song is present.
   */
  static includes(id: string): boolean {
    return !!SongWriter.songs[id];
  }

  /**
   * Creates a new song.
   * @param {string} id New song Id.
   * @returns {Song | null} New song.
   */
  static create(id: string): Song {
    if (SongWriter.includes(id)) {
      return SongWriter.getSong(id);
    }

    SongWriter.songs[id] = new Song(id);

    return SongWriter.getSong(id);
  }
}
