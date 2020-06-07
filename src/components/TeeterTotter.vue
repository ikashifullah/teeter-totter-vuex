<template>
  <div class="hello">
    <div class="game-height game-width d-inline-block">
      <div class="space-above-scale"></div>
      <Shape
        v-for="wObject in weighObjects"
        :key="wObject.id"
        :id="wObject.id"
        :right="wObject.right" />
      <div v-if="gameOver" class="game-over">
        <h3>Game Over</h3>
        <div>Refresh page to Play again</div>
      </div>
    </div>
    <div>
      <button class="pause-btn" @click="togglePause">
        {{pauseOrResume}}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Shape from './Shape.vue';

export default {
  name: 'TeeterTotter',
  components: {
    Shape,
  },
  data() {
    return {
      timerHandle: null,
      gameOver: false,
      weighObjects: [],
      pauseOrResume: 'Pause',
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
      console.log(`event.keyCode: ${event.keyCode}`);
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
      });
      this.weighObjects.push({
        id: this.weighObjects.length + 1,
        right: false,
      });
      this.startTimer();
    },
    endGame() {
      if (this.isPaused) {
        clearInterval(this.timerHandle);
      }
      if (this.scaleBarRotatedByDeg > 30 || this.scaleBarRotatedByDeg < -30) {
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
      this.pauseOrResume = !this.isPaused ? 'Pause' : 'Play';
      if (!this.isPaused) {
        this.resumePlay();
      }
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
  background-color: lightgrey;
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
  color: red;
  margin-top: 80px;
}
</style>
