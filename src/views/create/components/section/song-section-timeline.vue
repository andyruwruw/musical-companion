<template>
  <div :class="$style.component">
    <div
      v-for="bar in bars"
      :key="`section-${index}-bar-${bar}`"
      :class="$style.bar"
      :style="{
        '--bar': bar - 1,
      }">
      <div
        v-for="segment in segments"
        :key="`section-${index}-bar-${bar}-segment-${segment}`"
        :class="$style.segment"
        :style="{
          '--width-percent': `${(100 / segments)}%`,
        }"
        @click="handleClick(
          bar,
          segment,
        )"
        @keydown="handleClick(
          bar,
          segment,
        )">
        <span />
      </div>
    </div>

    <song-section-timeline-chord
      v-for="chord in chords"
      :key="`section-${index}-chord-${chord.getId()}`"
      :song="song"
      :section="index"
      :chord="chord.getId()"
      :active="activeChord === chord.getId()"
      @chord-edit="handleChordEdit"
      @style-edit="handleStyleEdit"
      @preview-pull-left="handlePreviewPullChordLeft"
      @pull-left="handlePullChordLeft"
      @preview-pull-right="handlePreviewPullChordRight"
      @pull-right="handlePullChordRight" />
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import { Chord } from '../../../../helpers/song-writer/chord';
import { Song } from '../../../../helpers/song-writer/song';
import { SongSectionVariation } from '../../../../helpers/song-writer/song-section-variation';
import SongSectionTimelineChord from '../chord/song-section-timeline-chord.vue';

export default Vue.extend({
  name: 'create-song-section-timeline',

  components: {
    SongSectionTimelineChord,
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

  computed: {
    bars(): number {
      const id = this.song.getTimlineSection(this.index).getVariation();
      const variation = this.song.getSectionVariation(id);
      return variation.getBars();
    },

    /**
     * Segements bars are split into.
     */
    segments(): number {
      return this.song.getBarSplit();
    },

    /**
     * Retrieves the variation.
     */
    segment(): SongSectionVariation {
      return this.song.getSectionVariation(this.index);
    },

    /**
     * List of chords in this section.
     */
    chords(): Chord[] {
      return this.song.getSectionVariation(this.index).getChordsOrdered();
    },
  },

  methods: {
    /**
     * Handles clicking a segment.
     * @param {number} bar Bar clicked.
     * @param {number} segment Segment clicked.
     */
    handleClick(
      bar: number,
      segment: number,
    ): void {
      console.log(bar, segment);
    },

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

    /**
     * Handles tugging a chord's start.
     *
     * @param {Record<string, number>} payload Chord pull info.
     */
    handlePullChordLeft({
      chord,
      start,
    }: Record<string, number>): void {
      this.segment.pullChordLeft(
        chord,
        start,
      );
    },

    /**
     * Handles tugging a chord's start.
     *
     * @param {Record<string, number>} payload Chord pull info.
     */
    handlePreviewPullChordLeft({
      chord,
      start,
    }: Record<string, number>): void {
      this.segment.previewPullChordLeft(
        chord,
        start,
      );
    },

    /**
     * Handles tugging a chord's end.
     *
     * @param {Record<string, number>} payload Chord pull info.
     */
    handlePullChordRight({
      chord,
      end,
    }: Record<string, number>): void {
      this.segment.pullChordRight(
        chord,
        end,
      );
    },

    /**
     * Handles tugging a chord's end.
     *
     * @param {Record<string, number>} payload Chord pull info.
     */
    handlePreviewPullChordRight({
      chord,
      end,
    }: Record<string, number>): void {
      this.segment.previewPullChordRight(
        chord,
        end,
      );
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  width: 100%;
  position: relative;
  width: calc((100vw - 2rem) - 200px - 1rem);
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  height: 160px;
  overflow-x: auto;
  background: rgba(240, 240, 240, 0.597)}

.bar {
  --bar: 0;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  border-left: 1px solid #E0E0E0;
  height: 100%;
  width: 200px;
  left: calc(var(--bar) * 200px);
  background-color: white;
  transition: all .2s ease-in-out;

  &:last-of-type {
    border-right: 1px solid #E0E0E0;
  }

  &:first-of-type {
    border-left: 0px;
  }

  .segment {
    --width-percent: 0;

    width: var(--width-percent);
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    cursor: pointer;

    span {
      position: absolute;
      height: 25%;
      width: 1px;
      background-color: #E0E0E0;
      transition: all .2s ease-in-out;
      z-index: 0;
    }

    &:first-of-type {
      span {
        background-color: transparent;
      }
    }

    &:hover {
      span {
        background-color: #878787;
        height: 30%;
      }

      &:first-of-type {
        span {
          transform: translateX(-1px);
          height: 100%;
        }
      }
    }
  }
}
</style>
