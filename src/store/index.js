import { createStore } from 'vuex';
import { loader } from './modules/loader';

export const store = createStore({
  state() {
  },
  modules: {
    loader
  }
});
