<template>
  <div :class="$style.component">
    <div
      :class="$style.header"
      @click="handleClick"
      @keydown="handleClick">
      <v-icon
        :class="$style.icon"
        large>
        mdi-plus
      </v-icon>
    </div>

    <div
      :class="$style.timeline"
      @click="handleClick"
      @keydown="handleClick">
      <v-icon
        :class="$style.icon"
        large>
        mdi-plus
      </v-icon>
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

export default Vue.extend({
  name: 'create-song-section-timeline',

  methods: {
    /**
     * Handle click.
     */
    handleClick(): void {
      this.$emit('create');
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

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    padding: 1rem;
    border-radius: 5px;
    height: 160px;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    width: calc((100vw - 2rem) - 200px - 1rem);
    border-radius: 5px;
    height: 160px;
    overflow-x: auto;
    background: rgb(255, 255, 255);
  }

  .timeline,
  .header {
    cursor: pointer;
    transition: all .3s ease;
    border: 1px solid #efefef;

    .icon {
      opacity: .2;
      transition: all .3s ease;
    }
  }

  &:hover {
    .timeline,
    .header {
      border: 1px solid rgb(208, 208, 208);
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.111);
      transform: translateY(-3px);
      z-index: 3;
      border: 1px solid #E0E0E0;

      .icon {
        opacity: .2;
      }
    }
  }

  &:active {
    .timeline,
    .header {
      background: rgb(245, 245, 245);
    }
  }
}
</style>
