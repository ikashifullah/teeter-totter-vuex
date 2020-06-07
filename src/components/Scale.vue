<template>
  <div>
    <div
      class="bar"
      :style="{
        transform: 'rotate(' + scaleBarRotatedByDeg + 'deg)'
      }"
      ref="scaleElem"
      :class="{
        'trans-to-balance': scaleBarRotatedByDeg == 0
      }">
    </div>
    <div
      class="pivot"
      :style="{
        position: 'absolute',
        left: (scaleBarCenter.x - 20) + 'px'
      }">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Scale',
  data() {
    return {
      rotation: 0,
      centerX: 0,
      centerY: 0,
    };
  },
  computed: mapState([
    'timer',
    'scaleBarCenter',
    'scaleBarRotatedByDeg',
    'motionOnLeft',
    'motionOnRight',
  ]),
  watch: {
    timer() {
      this.updateBalance();
    },
  },
  mounted() {
    this.centerX = this.$refs.scaleElem.getBoundingClientRect().left
      + this.$refs.scaleElem.offsetWidth / 2;
    this.centerY = this.$refs.scaleElem.getBoundingClientRect().top
      + this.$refs.scaleElem.offsetHeight / 2;
    this.$store.commit('setScaleBarCenter', {
      x: this.centerX,
      y: this.centerY,
    });
  },
  methods: {
    updateBalance() {
      if (this.motionOnLeft > this.motionOnRight) {
        this.$store.commit('decrementRotation');
      } else if (this.motionOnLeft < this.motionOnRight) {
        this.$store.commit('incrementRotation');
      } else {
        this.$store.commit('setZeroRotation');
      }
    },
  },
};
</script>

<style scoped>
div.trans-to-balance {
  transition: transform 1.5s;
}
div.bar {
  width: 500px;
  height: 10px;
  display: inline-block;
  background-color: #bb083a;
}
div.pivot {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 80px solid #000000;
  margin-top: -5px;
}
</style>
