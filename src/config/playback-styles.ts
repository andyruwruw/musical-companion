// Local Imports
import { PlayedNote } from '../helpers/song-writer/played-note';
import { PlaybackStyle } from '../helpers/song-writer/playback-style';

export const SimpleChords = new PlaybackStyle(
  'simple-chords',
  'Simple Chords',
  [
    new PlayedNote(
      0,
      0,
      1,
    ),
    new PlayedNote(
      0,
      1,
      -1,
    ),
    new PlayedNote(
      0,
      2,
      -1,
    ),
    new PlayedNote(
      0,
      3,
      -1,
      false,
    ),
    new PlayedNote(
      0,
      4,
      -1,
      false,
    ),
    new PlayedNote(
      0,
      5,
      -1,
      false,
    ),
  ],
);
