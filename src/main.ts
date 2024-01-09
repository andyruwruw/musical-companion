// Packages
import { Draggable } from 'gsap/Draggable';
import Vue from 'vue';
import gsap from 'gsap';
import * as Tone from 'tone';

// Local Imports
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';

import './assets/styles/app.global.scss';

gsap.registerPlugin(Draggable);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
