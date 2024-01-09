// Local Imports
import { SimpleChords } from '../../config/playback-styles';
import { PlaybackStyle } from './playback-style';

export class SongSection {
  /**
   * Variation ID.
   */
  _variation: number;

  /**
   * Instruments to play.
   */
  _instruments: string[];

  /**
   * Way to play the section.
   */
  _style: PlaybackStyle[];

  /**
   * Number of repetitions of the section.
   */
  _repetitions = 1;

  constructor(
    variation: number,
    instruments = ['piano'],
    style = [SimpleChords] as PlaybackStyle[],
    repetitions = 1,
  ) {
    this._variation = variation;
    this._instruments = instruments;
    this._style = style;
    this._repetitions = repetitions;
  }

  /**
   * Retrieves Id for section variation.
   *
   * @returns {number} Section variation Id.
   */
  getVariation(): number {
    return this._variation;
  }

  /**
   * Sets the Id for the section variation for this section.
   *
   * @param {number} variation Section variation Id.
   */
  setVariation(variation: number): void {
    this._variation = variation;
  }

  /**
   * Retrieves instrument keys for this section.
   *
   * @returns {string[]} Instrument keys.
   */
  getInstruments(): string[] {
    return this._instruments;
  }
}
