<template>
  <div :class="$style.component">
    <div :class="$style.header">
      <span>
        Chord Type
      </span>
    </div>

    <div :class="$style['chord-list']">
      <div
        v-for="(category, categoryIndex) in chordList"
        :key="`chord-category-${category.title}`"
        :class="$style.category">
        <span :class="$style['chord-category-title']">
          {{ category.title }}
        </span>

        <div :class="$style.chords">
          <v-btn
            v-for="(chord, chordIndex) in category.chords"
            :key="`chord-${categoryIndex}-${chordIndex}-${chord.id}`"
            :class="{
              [$style.active]: chord.id === type,
            }"
            outlined
            @click="handleSelect(chord.id)">
            <span
              v-for="(bit, index) in chord.suffix"
              :key="`chord-button-${chord.id}-bit-${index}`"
              :class="[
                $style.bit,
                {
                  [$style.upper]: index % 2 === 1,
                  [$style.empty]: bit === '' && chord.suffix.length !== 1,
                },
              ]">
              {{ bit === '' && chord.suffix.length === 1 ? 'maj' : bit }}
            </span>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import {
  ADVANCED_CHORD_MENU,
  ChordConfig,
  CHORDS,
  NOTES,
  NOTE_MAP,
} from '../../../config/chords';
import { Instrument } from '../../../helpers/playback/instrument';

export default Vue.extend({
  name: 'chord-type-select',

  props: {
    /**
     * Currently selected type.
     *
     * @type {ChordType}
     */
    type: {
      type: String,
      default: 'maj',
    },

    /**
     * Current chord note.
     */
    root: {
      type: Number,
      default: 0,
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
     * Whether to display advanced menu.
     */
    advanced: false,
  }),

  computed: {
    /**
     * What to display on toggle button.
     */
    toggleButtonText(): string {
      return this.advanced ? 'Simple' : 'Advanced';
    },

    /**
     * A list of chord groupings.
     */
    chordList() {
      const categories = [];

      for (let i = 0; i < ADVANCED_CHORD_MENU.length; i += 1) {
        categories.push({
          ...ADVANCED_CHORD_MENU[i],
          chords: ADVANCED_CHORD_MENU[i].chords.reduce((
            acc: ChordConfig[],
            chord: string,
          ) => {
            if (chord in CHORDS) {
              acc.push(CHORDS[chord]);
            }

            return acc;
          }, []),
        });
      }

      return categories;
    },
  },

  async mounted() {
    if (!this.instrument.isLoaded()) {
      await this.instrument.load();
    }
  },

  methods: {
    /**
     * Handles request to select a chord.
     *
     * @param {string} chord Chord to select.
     */
    handleSelect(chord: string) {
      if (this.instrument.isLoaded()) {
        const key = this.root;

        const notes = CHORDS[chord].pitchClass.map((steps: number) => {
          const keyIndex = (key + steps) % 12;

          console.log(keyIndex, NOTES[keyIndex]);

          return NOTES[keyIndex];
        });

        this.instrument.keyDown(notes);

        setTimeout(() => {
          this.instrument.keyUp(notes);
        }, 500);
      }

      this.$emit('clicked', chord);
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  max-height: 268px;
}

.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 8px;

  span {
    display: inline-block;
  }

  button {
    color: #e0e0e0;
    text-transform: none;
  }
}

.chord-list {
  width: 100%;
  overflow: auto;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;

  .chords {
    flex-wrap: wrap;
    justify-content: space-evenly;

    button {
      border: 1px solid #e0e0e0;
      color: #a4a4a4;
      margin: .2rem;
      width: calc(25% - .4rem);
      max-width: 85px;

      .bit {
        font-size: 14px;
        text-transform: none;

        &.upper {
          font-weight: bold;
          font-size: 9px;
          margin-bottom: auto;
        }

        &.empty {
          width: 12px;
          height: 14px;
          border-radius: 2px;
          background: rgb(255, 255, 255);
          border: 1px solid #e0e0e0;
          margin-right: 2px;
        }
      }

      &.active {
        color: black;
        border: 1px solid #adadad;

        .bit.empty {
          background: rgba(207, 207, 207, 0.117);
          border: 1px solid rgba(0, 0, 0, 0.849);
        }
      }
    }
  }
}

.chord-category-title {
  font-size: 12px;
  margin-bottom: .5rem;
  text-transform: uppercase;
  width: 100%;
  padding-left: 8px;
  color: #a4a4a4;
  padding-top: 4px;
}
</style>
