<template>
  <div
    v-click-outside="onClickOutside"
    v-if="section !== -1
      && section !== undefined
      && id !== -1
      && id !== undefined"
    :class="$style.component">
    <div :class="$style.content">
      <piano-select
        :instrument="instrument"
        :root="song ? song.getRoot() : 'C'"
        :selected="chord ? chord.getKey(song.getRootKey()) : -1"
        @clicked="handleChordKeyChange" />

      <chord-type-select
        :root="song && chord ? chord.getKey(song.getRootKey()) : 'C'"
        :type="chord ? chord.getType() : 'maj'"
        :instrument="instrument"
        @clicked="handleChordTypeChange" />
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import { NOTE_MAP } from '../../../../config/chords';
import { SongSectionVariation } from '../../../../helpers/song-writer/song-section-variation';
import { Instrument } from '../../../../helpers/playback/instrument';
import { Chord } from '../../../../helpers/song-writer/chord';
import { Song } from '../../../../helpers/song-writer/song';
import PianoSelect from '../../../../components/ui/input/piano-select.vue';
import ChordTypeSelect from '../../../../components/ui/input/chord-type-select.vue';

// Types
import { ChordType } from '../../../../types';

export default Vue.extend({
  name: 'create-chord-dialog',

  components: {
    ChordTypeSelect,
    PianoSelect,
  },

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
  },

  mounted() {
    this.instrument.load();
  },

  methods: {
    /**
     * Changes to the key of a chord.
     *
     * @param {number} key New key.
     */
    handleChordKeyChange(key: number) {
      if (this.chord) {
        const relative = (NOTE_MAP[key] - this.song.getRootKey() + 12) % 12;
        this.chord.setKey(relative);
      }
    },

    /**
     * Changes to the type of a chord.
     *
     * @param {ChordType} type New type.
     */
    handleChordTypeChange(type: ChordType) {
      if (this.chord) {
        this.chord.setType(type);
      }
    },

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

@keyframes slide-up {
  0% {
    transform: translateY(500px);
  }
}
</style>
