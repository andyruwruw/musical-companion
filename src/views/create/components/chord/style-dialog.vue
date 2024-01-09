<template>
  <div
    v-click-outside="onClickOutside"
    v-if="section !== -1
      && section !== undefined
      && id !== -1
      && id !== undefined"
    :class="$style.component">
    <div :class="$style.content">
      <div :class="$style.header">
        <v-btn
          v-for="(instrument, index) in instruments"
          :key="`style-dialog-instrument-${index}`"
          outlined>
          {{ instrument.name }}
        </v-btn>

        <v-btn
          colo="#e0e0e0"
          outlined>
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import { SongSectionVariation } from '../../../../helpers/song-writer/song-section-variation';
import { Instrument } from '../../../../helpers/playback/instrument';
import { Chord } from '../../../../helpers/song-writer/chord';
import { Song } from '../../../../helpers/song-writer/song';
import { SongSection } from '../../../../helpers/song-writer/song-section';
import { InstruemntType, InstrumentConfig, INSTRUMENTS } from '../../../../config/instruments';

export default Vue.extend({
  name: 'style-dialog',

  props: {
    /**
     * Reference to song.
     */
    song: {
      type: Song,
      required: true,
    },

    /**
     * Section to change chord of.
     */
    section: {
      type: Number,
      default: -1,
    },

    /**
     * Id of the chord selected.
     */
    id: {
      type: Number,
      default: -1,
    },
  },

  data: () => ({
    /**
     * Instrument for displaying options.
     *
     * @type {Instrument}
     */
    instrument: new Instrument(),
  }),

  computed: {
    /**
     * Retrieves the described variation.
     */
    variation(): SongSectionVariation | null {
      if (this.section >= 0) {
        return this.song.getSectionVariation(this.section);
      }
      return null;
    },

    /**
     * Retrieves the described section.
     */
    sectionData(): SongSection | null {
      if (this.section >= 0) {
        return this.song.getTimlineSection(this.section);
      }
      return null;
    },

    /**
     * Retrieves the described chord.
     */
    chord(): Chord | null {
      if (this.variation) {
        return this.variation.getChord(this.id);
      }
      return null;
    },

    /**
     * Retrieves the chord prior to this.
     */
    previousChord(): Chord | null {
      if (this.variation) {
        return this.variation.getPreviousChord(this.id);
      }
      return null;
    },

    /**
     * List of instruments available.
     */
    instruments(): InstrumentConfig[] {
      if (this.section >= 0) {
        return this.sectionData?.getInstruments().reduce((acc, instrument) => {
          if (instrument in INSTRUMENTS) {
            acc.push(INSTRUMENTS[instrument as InstruemntType]);
          }
          return acc;
        }, [] as InstrumentConfig[]) ?? [];
      }
      return [];
    },
  },

  mounted() {
    this.instrument.load();
  },

  methods: {
    /**
     * Handles click outside of component.
     */
    onClickOutside() {
      this.$emit('close');
    },
  },
});
</script>

<style lang="scss" module>
.component {
  animation: slide-up 1s ease-in-out;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px 10px 0 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  left: 0;
  max-height: 500px;
  position: fixed;
  width: 100vw;
}

.content {
  display: flex;
  justify-content: space-around;
}

.header {
  margin: 1rem;
  display: flex;
  overflow-x: auto;
  width: calc(100% - 2rem);
  justify-content: left;
  align-items: center;

  button:not(:first-of-type) {
    margin-left: 1rem;
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(500px);
  }
}
</style>
