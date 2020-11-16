import Vue from 'vue';
import router from '@/router';
import i18n from '@/i18n';
import { store } from './store';

import { setupInterceptors } from './utils/httpInterceptors';

import App from './App.vue';

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    setupInterceptors(store);
  },
}).$mount('#app');
