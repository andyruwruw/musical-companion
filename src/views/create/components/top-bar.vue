<template>
  <div :class="$style.component">
    <div :class="$style.row">
      <v-text-field
        v-model="name"
        :placeholder="song.getName()"
        background-color="#F4F4F4"
        hide-details
        outlined />

      <div :class="$style.actions">
        <v-btn
          icon
          large
          @click="save">
          <v-icon>
            mdi-export
          </v-icon>
        </v-btn>

        <v-btn
          icon
          large
          @click="save">
          <v-icon>
            mdi-play
          </v-icon>
        </v-btn>

        <v-btn
          icon
          large
          @click="expand">
          <v-icon>
            {{ expansionIcon }}
          </v-icon>
        </v-btn>
      </div>
    </div>

    <div
      v-if="showExpansion"
      :class="$style.row">
      <span :class="$style['row-title']">
        Song Settings
      </span>

      <div :class="$style.input">
        <v-text-field
          v-model="key"
          :rules="keyRules"
          label="Key"
          hide-details
          outlined
          dense />
      </div>

      <div :class="$style.input">
        <v-select
          v-model="mode"
          :items="modeChoices"
          label="Mode"
          hide-details
          outlined
          dense />
      </div>

      <div :class="$style.input">
        <v-text-field
          v-model="bpm"
          label="BPM"
          type="number"
          hide-details
          outlined
          dense />
      </div>

      <div :class="$style.input">
        <v-text-field
          v-model="timeSignature"
          :rules="timeSignatureRules"
          label="Time Sig"
          hide-details
          outlined
          dense />
      </div>

      <v-spacer />
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import { Song } from '../../../helpers/song-writer/song';
import { NOTE_MAP } from '../../../config/chords';

export default Vue.extend({
  name: 'create-top-bar',

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
     * Name of the song.
     */
    name: '',

    /**
     * Mode choice.
     */
    mode: 'maj',

    /**
     * Mode choices.
     */
    modeChoices: [
      {
        text: 'Major',
        value: 'maj',
      },
      {
        text: 'Minor',
        value: 'min',
      },
    ],

    /**
     * BPM of the song.
     */
    bpm: 70,

    /**
     * Key of the song.
     */
    key: 'C',

    /**
     * Rules for key values.
     */
    keyRules: [
      (v: string): boolean | string => (!!v || 'Key is required'),
      (v: string): boolean | string => (`${v[0].toUpperCase()}${v.slice(1)}` in NOTE_MAP || 'Key is invalid'),
    ],

    /**
     * Time signature of the song.
     */
    timeSignature: '4/4',

    /**
     * Rules for time signature values.
     */
    timeSignatureRules: [
      (v: string): boolean | string => (!!v || 'Time signature is required'),
      (v: string): boolean | string => (v.split('/').length === 2 || 'Time signature is invalid'),
      (v: string): boolean | string => (/^\d+[/\\]+\d+$/g.test(v) || 'Time signature is invalid'),
    ],

    /**
     * Whether or not to show the expansion.
     */
    showExpansion: false,
  }),

  methods: {
    /**
     * Saves the song.
     */
    save() {
      this.$emit('save');
    },

    /**
     * Expands the top bar.
     */
    expand() {
      this.showExpansion = !this.showExpansion;
    },
  },

  watch: {
    /**
     * Watches for changes in name.
     */
    name(name: string): void {
      this.song.setName(name);
    },

    /**
     * Watches for changes in bpm.
     */
    bpm(bpm: number): void {
      if (bpm <= 0) {
        this.bpm = 1;
      }

      this.song.setBpm(bpm);
    },

    /**
     * Watches for changes in key.
     */
    key(key: string): void {
      if (!key || !key.length) {
        return;
      }

      this.key.replace('#', '♯');
      this.key.replace('b', '♭');

      if (key[0].toUpperCase() !== key[0]) {
        this.key = `${key[0].toUpperCase()}${key.slice(1)}`;
        return;
      }
      this.song.setRoot(key);
    },

    /**
     * Watches for changes in time signature.
     */
    timeSignature(timeSignature: string): void {
      this.song.setTimeSignature(timeSignature);
    },
  },

  computed: {
    /**
     * Icon for settings exansion button.
     *
     * @type {string}
     */
    expansionIcon(): string {
      return this.showExpansion ? 'mdi-chevron-down' : 'mdi-chevron-up';
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

.row-title {
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.309);
  margin-right: 2rem;
  padding-left: 12px;
  padding-bottom: .6rem;
}

.row {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1rem 0;

  &:not(:first-child) {
    border-bottom: 1px solid #E0E0E0;
    border-top: 1px solid #E0E0E0;
    margin-top: 0px;
    animation: fade-in .5s;
  }
}

.actions {
  padding-left: 1rem;
}

.input {
  display: flex;
  max-width: 150px;
  padding: 0 1rem;
  border-left: 1px solid #e0e0e0;

  &:not(:first-child) {
    margin: 1rem;
  }

  span {
    font-size: 1rem;
    margin-right: 1rem;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
}
</style>
