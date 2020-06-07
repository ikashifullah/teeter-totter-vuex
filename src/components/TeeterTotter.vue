<template>
  <div>
    <div class="game-height game-width d-inline-block">
      <div class="space-above-scale"></div>
      <Shape
        v-for="wObject in weighObjects"
        :key="wObject.id"
        :id="wObject.id"
        :right="wObject.right"
        :size="wObject.size" />
      <Scale />
    </div>
    <div>
      <span class="left-total">Left Total: <strong>{{leftTotal}}</strong></span>
      <button class="pause-btn" @click="togglePause">
        {{pauseOrResume}}
      </button>
      <span class="right-total">Right Total: <strong>{{rightTotal}}</strong></span>
    </div>
    <div v-if="gameOver" class="game-over">
      <h3>Game Over</h3>
      <div>Refresh page to Play again</div>
      <button @click="replay" class="pause-btn">Replay</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Shape from './Shape.vue';
import Scale from './Scale.vue';

export default {
  name: 'TeeterTotter',
  components: {
    Shape,
    Scale,
  },
  data() {
    return {
      timerHandle: '',
      isPaused: false,
      gameOver: false,
      weighObjects: [],
      pauseOrResume: 'Pause',
      leftTotal: 0,
      rightTotal: 0,
    };
  },
  computed: mapState(['timer', 'scaleBarRotatedByDeg', 'scaleBarCenter']),
  created() {
    window.addEventListener('keydown', this.onLeftOrRightArrowKeyPress);
  },
  mounted() {
    this.startGame();
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onLeftOrRightArrowKeyPress);
  },
  watch: {
    timer() {
      this.endGame();
    },
  },
  methods: {
    onLeftOrRightArrowKeyPress(event) {
      if (event.keyCode === 37) {
        this.$store.commit('toggleLeftArrowKeyPressed');
      }
      if (event.keyCode === 39) {
        this.$store.commit('toggleRightArrowKeyPressed');
      }
    },
    startTimer() {
      const self = this;
      this.timerHandle = setInterval(() => {
        self.$store.commit('incrementTimer');
      }, 10);
    },
    startGame() {
      this.weighObjects.push({
        id: this.weighObjects.length + 1,
        right: true,
        size: Math.ceil(Math.random() * 10),
      });
      this.weighObjects.push({
        id: this.weighObjects.length + 1,
        right: false,
        size: Math.ceil(Math.random() * 10),
      });
      this.weighObjects.push({
        id: this.weighObjects.length + 1,
        right: false,
        size: Math.ceil(Math.random() * 10),
      });
      this.weighObjects.push({
        id: this.weighObjects.length + 1,
        right: false,
        size: Math.ceil(Math.random() * 10),
      });
      this.weighObjects.forEach((weigh) => {
        if (weigh.right === false) {
          this.leftTotal += weigh.size;
        } else {
          this.rightTotal += weigh.size;
        }
        return true;
      });
      this.startTimer();
    },
    endGame() {
      if (this.isPaused) {
        clearInterval(this.timerHandle);
      }
      if (this.scaleBarRotatedByDeg > 30 || this.scaleBarRotatedByDeg < -30
        || this.leftTotal >= 20) {
        this.gameOver = true;
        clearInterval(this.timerHandle);
        this.weighObjects = [];
      }
    },
    resumePlay() {
      this.startTimer();
    },
    togglePause() {
      this.isPaused = !this.isPaused;
      this.pauseOrResume = !this.isPaused ? 'Pause' : 'Continue';
      if (!this.isPaused) {
        this.resumePlay();
      }
    },
    replay() {
      return window.location.reload();
    },
  },
};
</script>

<style scoped>
.space-above-scale {
  height: 300px;
}
.game-height {
  height: 500px;
  background-color: #f2f2f2;
}
.game-width {
  width: 500px;
}
.d-inline-block {
  display: inline-block;
}
.pause-btn {
  background-color: teal;
  color: white;
  font-size: 2em;
  border-radius: 3px;
}
.game-over {
  width: 100%;
  background: #ffffff;
  color: red;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  opacity: 0.9;
  font-size: 50px;
}
.left-total {
  margin-right: 100px;
}
.right-total {
  margin-left: 30px;
}
</style>
