import Vue from 'vue';
import router from '@/router';
import { store } from './store';

import { setupInterceptors } from './utils/httpInterceptors';

import App from './App.vue';

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    setupInterceptors(store);
  },
}).$mount('#app');
