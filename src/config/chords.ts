// Types
import { ChordType } from '../types';

export interface ChordConfig {
  /**
   * Set unique identifier for the chord.
   */
  id: string;

  /**
   * Name of the chord.
   */
  name: string;

  /**
   * Pitches in the chord. Denoted by half steps from root.
   */
  pitchClass: number[];

  /**
   * How to display chord after letter.
   */
  suffix: string[];

  /**
   * Link to wikipedia page.
   */
  href: string;
}

/**
 * Chords and their various notes.
 */
export const CHORDS = {
  maj: {
    id: 'maj',
    name: 'Major',
    pitchClass: [0, 4, 7],
    suffix: [''],
    href: 'https://en.wikipedia.org/wiki/Major_triad',
  },
  min: {
    id: 'min',
    name: 'Minor',
    pitchClass: [0, 3, 7],
    suffix: ['m'],
    href: 'https://en.wikipedia.org/wiki/Minor_chord',
  },
  aug: {
    id: 'aug',
    name: 'Augmented',
    pitchClass: [0, 4, 8],
    suffix: ['aug'],
    href: 'https://en.wikipedia.org/wiki/Augmented_triad',
  },
  dim: {
    id: 'dim',
    name: 'Diminished',
    pitchClass: [0, 3, 6],
    suffix: ['dim'],
    href: 'https://en.wikipedia.org/wiki/Diminished_triad',
  },
  dim7: {
    id: 'dim7',
    name: 'Diminished 7th',
    pitchClass: [0, 3, 6, 9],
    suffix: ['', 'o7'],
    href: 'https://en.wikipedia.org/wiki/Diminished_seventh_chord',
  },
  m7b5: {
    id: 'm7b5',
    name: 'Half-diminished 7th',
    pitchClass: [0, 3, 6, 10],
    suffix: ['m', '7♭5'],
    href: 'https://en.wikipedia.org/wiki/Half-diminished_seventh_chord',
  },
  min7: {
    id: 'min7',
    name: 'Minor 7th',
    pitchClass: [0, 3, 7, 10],
    suffix: ['m', '7'],
    href: 'https://en.wikipedia.org/wiki/Minor_seventh_chord',
  },
  mmaj7: {
    id: 'mmaj7',
    name: 'Minor major 7th',
    pitchClass: [0, 3, 7, 11],
    suffix: ['m', 'M7'],
    href: 'https://en.wikipedia.org/wiki/Minor_major_seventh_chord',
  },
  dom7: {
    id: 'dom7',
    name: 'Dominant 7th',
    pitchClass: [0, 4, 7, 10],
    suffix: ['', '7'],
    href: 'https://en.wikipedia.org/wiki/Dominant_seventh_chord',
  },
  maj7: {
    id: 'maj7',
    name: 'Major 7th',
    pitchClass: [0, 4, 7, 11],
    suffix: ['maj', '7'],
    href: 'https://en.wikipedia.org/wiki/Major_seventh_chord',
  },
  aug7: {
    id: 'aug7',
    name: 'Augmented 7th',
    pitchClass: [0, 4, 8, 10],
    suffix: ['aug', '7'],
    href: 'https://en.wikipedia.org/wiki/Augmented_seventh_chord',
  },
  augmaj7: {
    id: 'augmaj7',
    name: 'Augmented major 7th',
    pitchClass: [0, 4, 8, 11],
    suffix: ['aug', 'M7'],
    href: 'https://en.wikipedia.org/wiki/Augmented_major_seventh_chord',
  },
  9: {
    id: '9',
    name: 'Dominant 9th',
    pitchClass: [0, 4, 7, 10, 2],
    suffix: ['', '9'],
    href: 'https://en.wikipedia.org/wiki/Ninth_chord#Dominant_ninth',
  },
  11: {
    id: '11',
    name: 'Dominant 11th',
    pitchClass: [0, 4, 7, 10, 2, 5],
    suffix: ['', '11'],
    href: 'https://en.wikipedia.org/wiki/Eleventh_chord',
  },
  13: {
    id: '13',
    name: 'Dominant 13th',
    pitchClass: [0, 4, 7, 10, 2, 5, 9],
    suffix: ['', '13'],
    href: 'https://en.wikipedia.org/wiki/Thirteenth#Dominant_thirteenth',
  },
  '7b9': {
    id: '7b9',
    name: '7th minor 9th',
    pitchClass: [0, 1, 4, 7, 10],
    suffix: ['', '7♭9'],
    href: '#',
  },
  '7#9': {
    id: '7#9',
    name: '7th sharp 9th',
    pitchClass: [0, 4, 7, 10, 3],
    suffix: ['', '7♯9'],
    href: 'https://en.wikipedia.org/wiki/Dominant_seventh_sharp_ninth_chord',
  },
  '7#11': {
    id: '7#11',
    name: '7th augmented 11th',
    pitchClass: [0, 4, 7, 10, 2, 6],
    suffix: ['', '7♯9'],
    href: '#',
  },
  '7b13': {
    id: '7b13',
    name: '7th diminished 13th',
    pitchClass: [0, 4, 7, 10, 2, 5, 8],
    suffix: ['', '7♭13'],
    href: '#',
  },
  add9: {
    id: 'add9',
    name: 'Added 9',
    pitchClass: [0, 4, 7, 2],
    suffix: ['', '9'],
    href: 'https://en.wikipedia.org/wiki/Added_tone_chord',
  },
  add4: {
    id: 'add4',
    name: 'Added 4th',
    pitchClass: [0, 4, 7, 5],
    suffix: ['', '4'],
    href: '#',
  },
  6: {
    id: '6',
    name: 'Added 6th',
    pitchClass: [0, 4, 7, 9],
    suffix: ['', '6'],
    href: 'https://en.wikipedia.org/wiki/Sixth_chord',
  },
  min6: {
    id: 'min6',
    name: 'Minor 6th',
    pitchClass: [0, 3, 7, 9],
    suffix: ['m', '6'],
    href: 'https://en.wikipedia.org/wiki/Sixth_chord',
  },
  '6/9': {
    id: '6/9',
    name: 'Six-nine',
    pitchClass: [0, 4, 7, 9, 2],
    suffix: ['', '6/9'],
    href: 'https://en.wikipedia.org/wiki/Ninth_chord#6/9_chord',
  },
  '7/6': {
    id: '7/6',
    name: 'Seven-six',
    pitchClass: [0, 4, 7, 9, 10],
    suffix: ['', '7/6'],
    href: 'https://en.wikipedia.org/wiki/Seven_six_chord',
  },
  sus2: {
    id: 'sus2',
    name: 'Suspended 2nd',
    pitchClass: [0, 2, 7],
    suffix: ['', 'sus2'],
    href: '',
  },
  sus4: {
    id: 'sus4',
    name: 'Suspended 4nd',
    pitchClass: [0, 5, 7],
    suffix: ['', 'sus4'],
    href: '',
  },
  '9sus4': {
    id: '9sus4',
    name: 'Jazz sus',
    pitchClass: [0, 5, 7, 10, 2],
    suffix: ['', '9sus4'],
    href: '',
  },
} as Record<string, ChordConfig>;

/**
 * Keys of basic chords.
 */
export const BASIC_CHORD_MENU = {
  title: 'Common',
  chords: [
    'maj',
    'min',
    '6',
    'dom7',
    'maj7',
    'aug',
    'aug7',
    'min6',
    'min7',
    'mmaj7',
    'dim',
    'dim7',
    'm7b5',
  ],
};

/**
 * Menued chords.
 */
export const ADVANCED_CHORD_MENU = [
  {
    title: 'Common',
    chords: [
      'maj',
      'min',
      '6',
      'dom7',
      'maj7',
      'aug',
      'aug7',
      'min6',
      'min7',
      'mmaj7',
      'dim',
      'dim7',
      'm7b5',
    ],
  },
  {
    title: 'Triads',
    chords: [
      'maj',
      'min',
      'aug',
      'dim',
    ],
  },
  {
    title: 'Sevenths',
    chords: [
      'dim7',
      'm7b5',
      'min7',
      'mmaj7',
      'dom7',
      'maj7',
      'aug7',
      'augmaj7',
    ],
  },
  {
    title: 'Extended',
    chords: [
      '9',
      '11',
      '13',
    ],
  },
  {
    title: 'Altered',
    chords: [
      '7b9',
      '7#9',
      '7#11',
      '7b13',
    ],
  },
  {
    title: 'Added',
    chords: [
      'add9',
      'add4',
      '6',
      'min6',
      '6/9',
      '7/6',
    ],
  },
  {
    title: 'Suspended',
    chords: [
      'sus2',
      'sus3',
      '9sus4',
    ],
  },
];

/**
 * Maps every note notation to an index of half steps from C.
 *
 * @type {Record<string, number>}
 */
export const NOTE_MAP = {
  'B#': 0,
  'B♯': 0,
  C: 0,
  'C#': 1,
  'C♯': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  'D♯': 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  'E#': 5,
  'E♯': 5,
  F: 5,
  'F#': 6,
  'F♯': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  'G♯': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  'A♯': 10,
  Bb: 10,
  B: 11,
  Cb: 11,
} as Record<string, number>;

/**
 * Notes in order.
 */
export const NOTES = [
  'C',
  'C♯',
  'D',
  'D♯',
  'E',
  'F',
  'F♯',
  'G',
  'G♯',
  'A',
  'A♯',
  'B',
];

/**
 * Notes in order.
 */
export const FLAT_NOTES = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
];

export const MODE_NOTES = {
  maj: [
    1,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
  ],
  min: [
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
  ],
} as Record<string, number[]>;

export const RECOMMENDED_CHORDS = {
  0: [ // I
    1, // I
    0,
    1, // ii
    0,
    1, // iii
    1, // IV
    0,
    1, // V
    0,
    1, // vi
    0,
    0,
  ],
  1: [],
  2: [ // ii
    0, // I
    0,
    0, // ii
    0,
    1, // iii
    1, // IV
    0,
    1, // V
    0,
    0, // vi
    0,
    0,
  ],
  3: [],
  4: [ // iii
    1, // I
    0,
    1, // ii
    0,
    0, // iii
    1, // IV
    0,
    0, // V
    0,
    1, // vi
    0,
    0,
  ],
  5: [ // IV
    1, // I
    0,
    0, // ii
    0,
    1, // iii
    0, // IV
    0,
    1, // V
    0,
    1, // vi
    0,
    0,
  ],
  6: [],
  7: [ // V
    1, // I
    0,
    0, // ii
    0,
    0, // iii
    1, // IV
    0,
    0, // V
    0,
    1, // vi
    0,
    0,
  ],
  8: [],
  9: [ // vi
    1, // I
    0,
    1, // ii
    0,
    0, // iii
    1, // IV
    0,
    1, // V
    0,
    0, // vi
    0,
    0,
  ],
  10: [],
  11: [],
} as Record<number, number[]>;

/**
 * Traditional progression.
 */
export const PROGRESSION = [
  {
    key: 0,
    type: 'maj',
  },
  {
    key: 2,
    type: 'min',
  },
  {
    key: 4,
    type: 'min',
  },
  {
    key: 5,
    type: 'maj',
  },
  {
    key: 7,
    type: 'maj',
  },
  {
    key: 9,
    type: 'min',
  },
  {
    key: 11,
    type: 'dim',
  },
];

export const BLACK_KEY = /[a-gA-G]+[b#♯]+/g;

export const HAS_OCTIVE = /.*\d+.*/g;
