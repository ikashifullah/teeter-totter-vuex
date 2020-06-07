import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timer: 0,
    scaleBarRotatedByDeg: 0,
    scaleBarCenter: {
      x: 0,
      y: 0,
    },
    isLeftKeyPressed: false,
    isRightKeyPressed: false,
  },
  mutations: {
    incrementTimer(state) {
      state.timer += state.timer + 1;
    },
    toggleLeftArrowKeyPressed(state) {
      state.isLeftKeyPressed = !state.isLeftKeyPressed;
    },
    toggleRightArrowKeyPressed(state) {
      state.isRightKeyPressed = !state.isRightKeyPressed;
    },
  },
  actions: {
  },
  modules: {
  },
});
