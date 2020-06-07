<template>
  <div
  :class="[{right: 'right'}, shape]"
  :style="{
    position: 'absolute',
    left: leftOffset + 'px',
    top: topOffset + 'px',
    width: shape !== 'triangle'
      ? width + 'px'
      : '0',
    height: shape !== 'triangle'
      ? height + 'px'
      : '0',
    'background-color': shape !== 'triangle'
      ? color : '',
    'border-left': shape == 'triangle'
      ? height/2 + 'px solid transparent'
      : '',
    'border-right': shape == 'triangle'
      ? height/2 + 'px solid transparent'
      : '',
    'border-bottom': shape == 'triangle'
      ? height + 'px solid ' + color
      : '',
    transform: 'rotate(' + scaleBarRotatedByDeg + 'deg)',
    'transform-origin':
      (scaleBarCenter.x - leftOffset) + 'px ' + (scaleBarCenter.y - topOffset) + 'px'
    }">
    <span class="shape-text" :style="{ top: top + '%' }">{{mass}}kg</span>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'Shape',
  props: {
    id: Number,
    right: Boolean,
    size: Number,
  },
  data() {
    const shapeId = Math.round(Math.random() * 2);
    let shape = '';
    if (shapeId === 2) {
      shape = 'circle';
    } else if (shapeId === 1) {
      shape = 'rectangle';
    } else {
      shape = 'triangle';
    }
    const mass = this.size;
    return {
      mass,
      shape,
      color: 'brown',
      width: mass * 5,
      height: mass * 5,
      leftOffset: 0,
      topOffset: 0,
      motion: 0,
      top: 0,
      hasHitTheBarScale: false,
    };
  },
  watch: {
    timer() {
      this.fall();
    },
    isLeftKeyPressed() {
      if (!this.right) {
        if (this.leftOffset > this.scaleBarCenter.x - 250) {
          this.leftOffset -= 5;
        }
      }
    },
    isRightKeyPressed() {
      if (!this.right) {
        if (this.leftOffset < this.scaleBarCenter.x) {
          this.leftOffset += 5;
        }
      }
    },
  },
  computed: mapState([
    'timer',
    'scaleBarCenter',
    'isLeftKeyPressed',
    'isRightKeyPressed',
    'scaleBarRotatedByDeg',
    'lastShapeColor',
  ]),
  created() {
    this.color = this.lastShapeColor === 'brown' ? 'red' : 'brown';
    this.height = this.shape === 'triangle' ? this.height * 2 : this.height;
    this.top = this.shape === 'triangle' ? (0.5 * this.height) * 2 : 0.5 * this.height;
    this.$store.commit('setLastShapeColor', this.color);
    this.leftOffset = this.right
      ? this.scaleBarCenter.x + Math.round(Math.random() * 250) - this.width
      : this.scaleBarCenter.x - Math.round(Math.random() * 250);
  },
  methods: {
    fall() {
      if (this.scaleBarCenter.y - (this.topOffset + this.height) < 1) {
        this.computeMotion();
        return;
      }
      this.topOffset += 0.5;
    },
    computeMotion() {
      const distanceFromPivotX = Math.abs(this.leftOffset - this.scaleBarCenter.x) / 50;
      this.motion = Math.round(this.mass * distanceFromPivotX);
      if (this.right) {
        if (this.hasHitTheBarScale) {
          return;
        }
        this.$store.commit('setMotionRight', this.motion);
        this.hasHitTheBarScale = true;
      } else {
        this.$store.commit('setMotionLeft', this.motion);
        this.hasHitTheBarScale = true;
      }
    },
  },
};
</script>

<style scoped>
.right {
  display: inline-block;
  position: absolute;
  color: white;
}
.circle {
  border-radius: 50%;
}
.shape-text {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  position: relative;
}
</style>
