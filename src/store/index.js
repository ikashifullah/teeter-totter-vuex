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
    motionOnLeft: 0,
    motionOnRight: 0,
    isLeftKeyPressed: false,
    isRightKeyPressed: false,
    lastShapeColor: 'blue',
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
    setMotionLeft(state, motion) {
      state.motionOnLeft = motion;
    },
    setMotionRight(state, motion) {
      state.motionOnRight += motion;
    },
    setScaleBarCenter(state, coordinates) {
      state.scaleBarCenter = coordinates;
    },
    incrementRotation(state) {
      state.scaleBarRotatedByDeg += 0.1;
    },
    decrementRotation(state) {
      state.scaleBarRotatedByDeg -= 0.1;
    },
    setZeroRotation(state) {
      state.scaleBarRotatedByDeg = 0;
    },
    setLastShapeColor(state, color) {
      state.lastShapeColor = color;
    },
  },
  actions: {
  },
  modules: {
  },
});
