<template>
  <v-app-bar
    v-if="show"
    background="transparent"
    flat
    outlined
    app>
    <div :class="$style.content">
      <v-img
        :class="$style.logo"
        max-width="30px"
        src="../../../assets/images/logo-50.svg"
        @click="goToLanding" />
    </div>
  </v-app-bar>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';
import gsap from 'gsap';

export default Vue.extend({
  name: 'app-bar',

  computed: {
    /**
     * Whether to show component.
     */
    show(): boolean {
      return this.$route.name !== 'Landing';
    },
  },

  mounted() {
    gsap.from('.v-app-bar', {
      duration: 1,
      y: -56,
      opacity: 1,
      delay: 1,
      stagger: 0.2,
      ease: 'bounce.out',
      force3D: true,
    });
  },

  methods: {
    goToLanding() {
      if (this.$route.name !== 'Landing') {
        this.$router.push('/');
      }
    },
  },
});
</script>

<style lang="scss" module>
.logo {
  cursor: pointer;
}

.content {
  width: calc(100vw - 2rem);
  max-width: 1000px;
  margin: 0 auto;
}
</style>
