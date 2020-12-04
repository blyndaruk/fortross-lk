import Vue from 'vue';
import VueMq from 'vue-mq';
// import VTooltip from 'v-tooltip';
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip';
import router from '@/router';
import i18n from '@/i18n';
import { store } from './store';

import { setupInterceptors } from './utils/httpInterceptors';

import App from './App.vue';


Vue.directive('tooltip', VTooltip);
Vue.directive('close-popover', VClosePopover);
Vue.component('v-popover', VPopover);

Vue.use(VueMq, {
  breakpoints: {
    mobile: 560,
    tablet: 768,
    md: 968,
    lg: 1200,
    laptop: 1440,
    desktop: Infinity,
  }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    setupInterceptors(store);
  },
}).$mount('#app');
