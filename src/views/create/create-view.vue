<template>
  <div :class="$style.component">
    <create-top-bar :song="song"/>

    <song-creator
      :song="song"
      @chord-edit="handleChordEdit"
      @style-edit="handleStyleEdit" />

    <chord-dialog
      :song="song"
      :section="chordSection"
      :id="chordId"
      @close="handleChordDialogClose"
      @selected="handleChordKeyChange" />

    <style-dialog
      :song="song"
      :section="styleSection"
      :id="styleId"
      @close="handleStyleDialogClose" />
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import { SongWriter } from '../../helpers/song-writer';
import { Song } from '../../helpers/song-writer/song';
import CreateTopBar from './components/top-bar.vue';
import SongCreator from './components/song-creator/song-creator.vue';
import ChordDialog from './components/chord/chord-dialog.vue';
import StyleDialog from './components/chord/style-dialog.vue';

export default Vue.extend({
  name: 'create-view',

  components: {
    CreateTopBar,
    ChordDialog,
    SongCreator,
    StyleDialog,
  },

  data: () => ({
    /**
     * Currently edited song.
     *
     * @type {null | Song}
     */
    song: null as null | Song,

    /**
     * Last open chord.
     *
     * @type {number}
     */
    lastOpenChord: -1,

    /**
     * Selected chord section.
     *
     * @type {number}
     */
    chordSection: -1,

    /**
     * Selected chord.
     *
     * @type {number}
     */
    chordId: -1,

    /**
     * Last open style.
     *
     * @type {number}
     */
    lastOpenStyle: -1,

    /**
     * Selected style section.
     *
     * @type {number}
     */
    styleSection: -1,

    /**
     * Selected style.
     *
     * @type {number}
     */
    styleId: -1,
  }),

  created() {
    const { id } = this.$route.params;

    this.song = SongWriter.create(id);
  },

  methods: {
    /**
     * Changes to the key of a chord.
     *
     * @param {number} key New key.
     */
    handleChordKeyChange(key: number) {
      const section = this.song?.getSectionVariation(this.chordSection);
      if (section) {
        const chord = section.getChord(this.chordId);

        if (chord) {
          chord.setKey(key);
        }
      }
    },

    /**
     * Handles request to edit chord.
     */
    handleChordEdit(payload: Record<string, number>) {
      console.log('open chord');

      this.lastOpenChord = Date.now();

      this.handleStyleDialogClose();

      this.chordSection = payload.section;
      this.chordId = payload.chord;
    },

    /**
     * Handles request to close chord dialog.
     */
    handleChordDialogClose() {
      if (this.lastOpenChord + 250 < Date.now()) {
        console.log('close chord');

        this.chordSection = -1;
        this.chordId = -1;
      }
    },

    /**
     * Handles request to edit chord.
     */
    handleStyleEdit(payload: Record<string, number>) {
      console.log('open style');

      this.lastOpenStyle = Date.now();

      this.handleChordDialogClose();

      this.styleSection = payload.section;
      this.styleId = payload.chord;
    },

    /**
     * Handles request to close style dialog.
     */
    handleStyleDialogClose() {
      if (this.lastOpenStyle + 250 < Date.now()) {
        console.log('close style');

        this.styleSection = -1;
        this.styleId = -1;
      }
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  width: calc(100vw - 2rem);
}
</style>
