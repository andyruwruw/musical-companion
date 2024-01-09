<template>
  <div :class="$style.component">
    <div :class="$style.header">
      <v-select
        v-model="variationInput"
        :items="variations"
        label="Variation"
        outlined
        dense
        hide-details
        style="max-height: 40px" />

      <div :class="$style['header-row']">
        <v-text-field
          v-model="bars"
          label="Bars"
          type="number"
          dense
          outlined
          hide-details />

        <v-text-field
          v-model="repeat"
          label="Repeat"
          type="number"
          dense
          outlined
          hide-details />
      </div>
    </div>

    <song-section-timeline
      :song="song"
      :index="index"
      :active-chord="activeChord"
      @chord-edit="handleChordEdit"
      @style-edit="handleStyleEdit" />
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import { Song } from '../../../../helpers/song-writer/song';
import { SongSection } from '../../../../helpers/song-writer/song-section';
import { SongSectionVariation } from '../../../../helpers/song-writer/song-section-variation';
import SongSectionTimeline from './song-section-timeline.vue';

export default Vue.extend({
  name: 'create-song-section',

  components: {
    SongSectionTimeline,
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
     * Section depicted.
     */
    index: {
      type: Number,
      required: true,
    },

    /**
     * Active chord.
     */
    activeChord: {
      type: Number,
      default: -1,
    },
  },

  data: () => ({
    /**
     * Variation input.
     */
    variationInput: 0,

    /**
     * Bars input.
     */
    bars: 4,

    /**
     * Repeat input.
     */
    repeat: 1,
  }),

  computed: {
    /**
     * Section this component is depicting.
     */
    section(): SongSection {
      return this.song.getTimlineSection(this.index);
    },

    /**
     * Variation of this section.
     */
    variation(): SongSectionVariation {
      return this.song.getSectionVariation(this.song.getTimlineSection(this.index).getVariation());
    },

    /**
     * Variations for this section.
     */
    variations() {
      const variations = Object.values(this.song.getSectionVariations());

      const items = variations.map((variation) => {
        return {
          value: variation.getId(),
          text: `Variation ${variation.getId() + 1}`,
        };
      });

      items.push({
        value: -1,
        text: 'Create New',
      });

      return items;
    },
  },

  methods: {
    /**
     * Handles request to edit chord.
     */
    handleChordEdit(payload: Record<string, number>) {
      this.$emit(
        'chord-edit',
        payload,
      );
    },

    /**
     * Handles request to edit chord.
     */
    handleStyleEdit(payload: Record<string, number>) {
      this.$emit(
        'style-edit',
        payload,
      );
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: calc(100vw - 2rem);
  margin-bottom: 1rem;
}

.header {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 1rem;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  height: 160px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: .6rem;
}
</style>
