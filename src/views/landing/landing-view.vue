<template>
  <div :class="$style.component">
    <v-img
      class="landing-logo"
      src="../../assets/images/logo-200.svg"
      max-width="200"
      max-height="200"
      contain />

    <span :class="[
      $style.title,
      'menu-options',
    ]">
      Musical Companion
    </span>

    <div :class="[
      $style['button-wrapper'],
      'menu-options',
    ]">
      <v-btn
        text
        @click="goToCreate">
        New Tune
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';
import gsap from 'gsap';

// Local Imports
import { getId } from '../../helpers/name';

export default Vue.extend({
  name: 'landing-view',

  mounted() {
    gsap.from('.landing-logo', {
      duration: 1,
      y: -100,
      opacity: 0,
      delay: 0.5,
      stagger: 0.2,
      ease: 'back.out',
      force3D: true,
    });

    gsap.from('.menu-options', {
      duration: 3,
      y: 200,
      opacity: 0,
      delay: 2,
      stagger: 0.2,
      ease: 'back.out',
      force3D: true,
    });
  },

  methods: {
    /**
     * Navigate to the create view.
     */
    goToCreate() {
      this.$router.push(`/create/${getId()}`);
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.title {
  font-size: 2rem;
}

.button-wrapper {
  margin-top: 1rem;
}
</style>
