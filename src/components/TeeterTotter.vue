<template>
  <div class="hello">
    <div class="game-height game-width d-inline-block">
      <div class="space-above-scale"></div>
      <div v-if="gameOver" style="color: orange; margin-top: 80px;">
        <h3>Game Over</h3>
        <div>Refresh page to Play again</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeeterTotter',
  props: {
    msg: String,
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
</style>
