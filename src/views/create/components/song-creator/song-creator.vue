<template>
  <div :class="$style.component">
    <song-section
      v-for="(section, index) in timeline"
      :key="`song-section-${index}`"
      :song="song"
      :index="index"
      :active-chord="section.getVariation() === activeChordSection ? activeChord : -1"
      @chord-edit="handleChordEdit"
      @style-edit="handleStyleEdit" />

    <song-section-add @create="addSection"/>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import { SongSection as SongSectionData } from '../../../../helpers/song-writer/song-section';
import { Song } from '../../../../helpers/song-writer/song';
import SongSection from '../section/song-section.vue';
import SongSectionAdd from '../section/song-section-add.vue';

export default Vue.extend({
  name: 'create-song-creator',

  components: {
    SongSection,
    SongSectionAdd,
  },

  props: {
    /**
     * Reference to song.
     */
    song: {
      type: Song,
      required: true,
    },
  },

  data: () => ({
    /**
     * Active chord.
     *
     * @type {number}
     */
    activeChord: -1,

    /**
     * Section of the active chord.
     *
     * @type {number}
     */
    activeChordSection: -1,
  }),

  computed: {
    /**
     * Retrieves the sections of the timeline.
     *
     * @returns {SongSectionData[]} Sections of the timeline.
     */
    timeline(): SongSectionData[] {
      return this.song.getTimeline();
    },
  },

  methods: {
    /**
     * Handles request to edit chord.
     */
    handleChordEdit(payload: Record<string, number>) {
      this.activeChord = payload.chord;
      this.activeChordSection = payload.section;

      this.$emit(
        'chord-edit',
        payload,
      );
    },

    /**
     * Handles request to edit chord.
     */
    handleStyleEdit(payload: Record<string, number>) {
      this.activeChord = payload.chord;
      this.activeChordSection = payload.section;

      this.$emit(
        'style-edit',
        payload,
      );
    },

    addSection() {
      console.log('create section');
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
