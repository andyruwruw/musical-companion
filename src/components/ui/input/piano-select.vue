<template>
  <div :class="$style.component">
    <div :class="$style.controls">
      <v-switch
        v-model="showNotes"
        :class="$style.input"
        prepend-icon="mdi-music-note" />

      <v-switch
        v-model="showFlats"
        :class="$style.input"
        :disabled="!showNotes"
        prepend-icon="mdi-music-accidental-flat"/>

      <v-switch
        v-model="showIntervals"
        :class="$style.input"
        prepend-icon="mdi-roman-numeral-4" />

      <v-switch
        v-model="showRecommends"
        :class="$style.input"
        prepend-icon="mdi-star" />
    </div>

    <div :class="$style.keyboard">
      <span
        v-for="(key, index) in keys"
        :key="`keyboard-key-${key.key}`"
        :class="{
          [$style.key]: true,
          [$style.black]: key.black,
          [$style.active]: index === selected,
        }"
        :style="{
          '--index': + key.index,
          '--half': key.black ? 1 : 0,
        }"
        @mousedown="handleClick(key)"
        @mouseup="handleUnclick(key)">
        <div :class="$style.label">
          <span :class="{
            [$style.hide]: !showNotes && index !== selected,
          }">
            {{  showFlats ? key.flat : key.key }}
          </span>

          <span v-if="showIntervals">
            {{  key.interval }}
          </span>
        </div>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import {
  NOTES,
  FLAT_NOTES,
  BLACK_KEY,
  NOTE_MAP,
} from '../../../config/chords';
import { Instrument } from '../../../helpers/playback/instrument';

export default Vue.extend({
  name: 'piano-select',

  props: {
    /**
     * Root note.
     */
    root: {
      type: String,
      default: 'C',
    },

    /**
     * Currently selected note.
     *
     * @type {number}
     */
    selected: {
      type: Number,
      default: -1,
    },

    /**
     * Instrument to play sample on.
     */
    instrument: {
      type: Instrument,
      default: new Instrument(),
    },
  },

  data: () => ({
    /**
     * Whether to show the notes.
     *
     * @type {boolean}
     */
    showNotes: false,

    /**
     * Whether to show notes as flats.
     *
     * @type {boolean}
     */
    showFlats: false,

    /**
     * Whether to show recommended notes.
     *
     * @type {boolean}
     */
    showRecommends: false,

    /**
     * Whether to show intervals.
     *
     * @type {boolean}
     */
    showIntervals: false,

    /**
     * When notes were played.
     */
    lastClicked: 0,
  }),

  computed: {
    /**
     * Set of keys that make up the keyboard.
     */
    keys(): Record<string, string | boolean | number>[] {
      const notes = [];
      const rootIndex = NOTE_MAP[this.root];

      let index = 0;

      for (let i = 0; i < NOTES.length; i += 1) {
        const black = BLACK_KEY.test(NOTES[i]);

        let interval;
        switch ((i - rootIndex + 12) % 12) {
          case 0:
            interval = 'I';
            break;
          case 2:
            interval = 'II';
            break;
          case 4:
            interval = 'iii';
            break;
          case 5:
            interval = 'IV';
            break;
          case 7:
            interval = 'V';
            break;
          case 9:
            interval = 'vi';
            break;
          default:
            interval = '';
        }

        notes.push({
          key: NOTES[i],
          flat: FLAT_NOTES[i],
          black,
          index,
          interval,
        });

        if (!black) {
          index += 1;
        }
      }

      return notes;
    },
  },

  async mounted() {
    if (!this.instrument.isLoaded()) {
      await this.instrument.load();
    }
  },

  methods: {
    /**
     * Handles the player selecting a key.
     *
     * @param {Record<string, string | boolean | number>} key Key selected.
     */
    handleClick(key: Record<string, string | boolean | number>) {
      if (this.instrument) {
        this.lastClicked = Date.now();
        this.instrument.keyDown(key.key as string);
      }

      this.$emit('clicked', key.key as string);
    },

    /**
     * Handles the player de-selecting a key.
     *
     * @param {Record<string, string | boolean | number>} key Key de-selected.
     */
    handleUnclick(key: Record<string, string | boolean | number>) {
      if (this.lastClicked + 500 > Date.now()) {
        setTimeout(() => {
          this.handleUnclick(key);
        }, 200);
        return;
      }

      if (this.instrument) {
        this.instrument.keyUp(key.key as string);
      }
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  width: calc(420px + 2rem);
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: .5rem;
  width: 100%;
  padding: 0 .5rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.keyboard {
  display: flex;
  position: relative;
  height: 200px;

  .key {
    --border: #e0e0e0;
    --index: 0;
    --half: 0;
    --width: 60px;

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: var(--width);
    border-left: 1px solid var(--border);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: white;
    transition: all .3s ease;
    cursor: pointer;
    border-radius: 5px;

    &.active {
      color: rgba(82, 82, 82, 0.792);
      background: rgba(239, 239, 239, 0.88);
    }

    span {
      height: 25%;
      transition: all .3s ease;

      &.hide {
        opacity: 0;
      }
    }

    &:last-of-type {
      border-right: 1px solid var(--border);
    }

    &:hover:not(.active) {
      background: rgb(234, 234, 234);
    }

    &:active:not(.active) {
      background: rgb(225, 225, 225);
      transform: translateY(2px) scale(.98);
      color: rgba(56, 56, 56, 0.792);
    }

    .label {
      display: flex;
      flex-direction: column;

      span {
        text-align: center;
        animation: fade-in .3s ease;

        &:last-of-type:not(:first-of-type) {
          opacity: .5;

          &.hide {
            opacity: 0;
          }
        }
      }
    }

    &:not(.black) {
      .label {
        padding-top: 150%;
      }
    }

    &.black {
      --small-width: 35px;

      background: rgb(43, 43, 43);
      color: white;
      width: 35px;
      height: 50%;
      z-index: 1;
      position: absolute;
      left: calc(var(--index) * var(--width) - (var(--half) * 0.5 * (var(--width) - var(--small-width))));

      &.active {
        background: rgb(50, 50, 50);
        color: rgb(194, 194, 194);
      }

      &:hover {
        background: rgb(68, 68, 68);
      }

      &:active:not(.active) {
        color: rgb(222, 222, 222);
      }
    }
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
}
</style>
