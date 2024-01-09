<template>
  <div
    :id="`chord-${section}-${chord}`"
    :class="[
      $style.component,
      {
        [`${$style.active}`]: active,
        [$style.hidden]: chordData.getStart() >= chordData.getEnd(),
      }
    ]"
    :style="{
      '--start': chordData.getStart(),
      '--duration': chordData.getDuration(),
    }"
    :draggable="!hoveringLeftBorder && !hoveringRightBorder"
    @drag="updateDrag"
    @dragover="updateDraggedOver">
    <span :class="$style.label">
      <span>
        {{ key }}
      </span>

      <span
        v-for="(bit, index) in chordType"
        :key="`chord-card-${section}-${chord}-bit-${index}`"
        :class="[
          $style.bit,
          {
            [$style.upper]: index % 2 === 1,
            [$style.empty]: bit === '',
          },
        ]">
        {{ bit }}
      </span>
    </span>

    <span :class="$style.actions">
      <v-btn
        :class="$style.edit"
        icon
        @click="handleEdit">
        <v-icon>
          mdi-music-clef-treble
        </v-icon>
      </v-btn>

      <v-btn
        :class="$style.edit"
        icon
        @click="handleStyle">
        <v-icon>
          mdi-playlist-music-outline
        </v-icon>
      </v-btn>
    </span>

    <div
      :class="$style.edge"
      :draggable="hoveringLeftBorder"
      @mouseover="hoveringLeftBorder = true"
      @focus="hoveringLeftBorder = true"
      @mouseleave="hoveringLeftBorder = false"
      @blur="hoveringLeftBorder = false"
      @drag="updateLeftStretch"
      @dragend="dropLeftStretch">
      <span :class="$style['hover-indicator']"/>
    </div>

    <div
      :class="$style.edge"
      :draggable="hoveringRightBorder"
      @mouseover="hoveringRightBorder = true"
      @focus="hoveringRightBorder = true"
      @mouseleave="hoveringRightBorder = false"
      @blur="hoveringRightBorder = false"
      @drag="updateRightStretch"
      @dragend="dropRightStretch">
      <span :class="$style['hover-indicator']" />
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import { Song } from '../../../../helpers/song-writer/song';
import { Chord } from '../../../../helpers/song-writer/chord';
import { CHORDS, NOTES } from '../../../../config/chords';

export default Vue.extend({
  name: 'create-song-section-timeline-chord',

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
    section: {
      type: Number,
      required: true,
    },

    /**
     * Chord Id.
     */
    chord: {
      type: Number,
      required: true,
    },

    /**
     * Whether this chord is active in edit.
     */
    active: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    /**
     * Whether the user is hoving the left border dragger.
     *
     * @type {boolean}
     */
    hoveringLeftBorder: false,

    /**
     * Whether the user is hoving the right border dragger.
     *
     * @type {boolean}
     */
    hoveringRightBorder: false,

    /**
     * Whether the user is dragging the element.
     */
    isDragging: false,

    /**
     * Start of the drag.
     *
     * @type {number}
     */
    dragStart: 0,

    /**
     * Start of the drag in pixels.
     *
     * @type {number}
     */
    dragStartPixels: 0,
  }),

  computed: {
    /**
     * Data on the chord.
     *
     * @returns {Chord} Chord data.
     */
    chordData(): Chord {
      return this.song.getSectionVariation(this.section).getChord(this.chord);
    },

    /**
     * Key of the chord.
     *
     * @returns {string} Key of the chord.
     */
    key(): string {
      return NOTES[this.chordData.getKey(this.song.getRootKey())];
    },

    /**
     * Type of the chord.
     *
     * @returns {string[]} Chord type.
     */
    chordType(): string[] {
      return CHORDS[this.chordData.getType()].suffix;
    },
  },

  methods: {
    /**
     * Handles request to edit chord.
     */
    handleEdit(): void {
      this.$emit(
        'chord-edit',
        {
          section: this.section,
          chord: this.chord,
        },
      );
    },

    /**
     * Handles request to edit chord.
     */
    handleStyle(): void {
      this.$emit(
        'style-edit',
        {
          section: this.section,
          chord: this.chord,
        },
      );
    },

    /**
     * Updates based on drag.
     *
     * @param {DragEvent} event Drag event.
     */
    updateDrag(event: DragEvent): void {
      console.log('drag event');
    },

    /**
     * Updates that an item has been dragged over this element.
     *
     * @param {DragEvent} event Drag event.
     */
    updateDraggedOver(event: DragEvent): void {
      console.log('dragged over', event.offsetX, event);

      // (event.target as unknown as Record<string, string>).id as string
    },

    /**
     * Updates based on left drag.
     *
     * @param {DragEvent} event Drag event.
     */
    updateLeftStretch(event: DragEvent): void {
      if (!this.isDragging) {
        this.isDragging = true;
        this.dragStart = this.chordData.getStart();
        this.dragStartPixels = event.clientX;
      }

      const start = this.dragStart - (Math.round((this.dragStartPixels - event.clientX) / 50) / this.song.getBarSplit());

      if (start < 0) {
        return;
      }

      if (start !== this.chordData.getStart()) {
        this.$emit(
          'preview-pull-left',
          {
            chord: this.chord,
            start,
          },
        );
      }
    },

    /**
     * Updates based on left drag.
     *
     * @param {DragEvent} event Drag event.
     */
    dropLeftStretch(event: DragEvent): void {
      this.isDragging = false;

      const start = this.dragStart - (Math.round((this.dragStartPixels - event.clientX) / 50) / this.song.getBarSplit());

      this.$emit(
        'pull-left',
        {
          chord: this.chord,
          start,
        },
      );
    },

    /**
     * Updates based on left drag.
     *
     * @param event
     */
    updateRightStretch(event: DragEvent): void {
      if (!this.isDragging) {
        this.isDragging = true;
        this.dragStart = this.chordData.getEnd();
        this.dragStartPixels = event.clientX;
      }

      const end = this.dragStart - (Math.round((this.dragStartPixels - event.clientX) / 50) / this.song.getBarSplit());

      if (end < 0) {
        return;
      }

      if (end !== this.chordData.getEnd()) {
        this.$emit(
          'preview-pull-right',
          {
            chord: this.chord,
            end,
          },
        );
      }
    },

    /**
     * Updates based on left drag.
     *
     * @param {DragEvent} event Drag event.
     */
    dropRightStretch(event: DragEvent): void {
      this.isDragging = false;

      const end = this.dragStart - (Math.round((this.dragStartPixels - event.clientX) / 50) / this.song.getBarSplit());

      this.$emit(
        'pull-right',
        {
          chord: this.chord,
          end,
        },
      );
    },
  },
});
</script>

<style lang="scss" module>
.component {
  --start: 0;
  --duration: 1;

  align-items: center;
  background: rgba(243, 243, 243, 0.081);
  background-color: rgba(255, 255, 255, 0.597);
  border: 1px solid rgb(234, 234, 234);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: calc(100% - 1rem);
  justify-content: center;
  left: calc((var(--start) * 200px) + .5rem);
  position: absolute;
  top: .5rem;
  transition: all .3s ease;
  width: calc((var(--duration) * 200px) - 1rem);
  z-index: 2;

  .actions {
    display: flex;
    justify-content: center;
    opacity: 0;
    top: calc(100% - 3rem);
    position: absolute;
    width: 100%;
    transition: all .3s ease;

    button {
      margin: 0 .25rem;
    }
  }

  &.hidden {
    opacity: 0;
  }

  &.active {
    background: rgba(230, 230, 230, 0.402) !important;
    border: 1px solid rgb(158, 158, 158);
  }

  &:hover {
    border: 1px solid rgb(208, 208, 208);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.111);
    transform: translateY(-3px);
    z-index: 3;

    .actions {
      opacity: 1;
    }
  }

  &:active {
    background: rgb(255, 255, 255);
    border: 1px solid rgb(150, 150, 150);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.111);
    transform: scale(1.02);
  }
}

.label {
  display: flex;

  .bit.upper {
    margin-left: 2px;
    font-size: 12px;
  }
}

.edge {
  --width: 20px;

  cursor: col-resize;
  display: flex;
  height: 100%;
  justify-content: flex-start;
  overflow: hidden;
  position: absolute;
  width: var(--width);

  .hover-indicator {
    height: 100%;
    transition: all .3s ease;
    width: 0px;
  }

  &:active {
    .hover-indicator {
      opacity: 0;
    }
  }

  &:hover {
    .hover-indicator {
      background: rgba(216, 216, 216, 0.142);
      width: 100%;
    }
  }

  &:first-of-type {
    left: 0;
  }

  &:last-of-type {
    justify-content: flex-end;
    right: 0;
  }
}

@keyframes pulse {
  50% {
    width: 50%;
  }
}
</style>
