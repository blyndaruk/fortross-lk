import { createApp, h } from 'vue';
import { store } from './store';
import { setupInterceptors } from './utils/httpInterceptors';

import App from './App.vue';


const app = createApp({
  render: () => h(App),
  created() {
    setupInterceptors(store);
  },
});

app.use(store);

app.mount('#app');
