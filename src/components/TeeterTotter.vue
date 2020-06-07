<template>
  <div class="hello">
    <div class="game-height game-width d-inline-block">
      <div class="space-above-scale"></div>
      <div v-if="gameOver" class="game-over">
        <h3>Game Over</h3>
        <div>Refresh page to Play again</div>
      </div>
    </div>
    <div>
      <button class="pause-btn">
        {{pauseOrResume}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeeterTotter',
  props: {
    msg: String,
  },
  data() {
    return {
      gameOver: false,
      pauseOrResume: 'Pause',
    };
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
