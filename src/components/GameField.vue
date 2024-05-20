<script setup lang="ts">
import { ref } from "vue";

const gameState = ref<{
  field: string[];
  isRunning: boolean;
  currentPlayerO: boolean;
  currentTurn: number;
}>({
  field: ["", "", "", "", "", "", "", "", ""],
  isRunning: true,
  currentPlayerO: false,
  currentTurn: 0,
});

const handleClick = (i: number) => {
  if (gameState.value.currentPlayerO) {
    gameState.value.field[i] = "O";
  }
  if (!gameState.value.currentPlayerO) {
    gameState.value.field[i] = "X";
  }
  endTurn();
};

const endTurn = () => {
  gameState.value.isRunning = false;
  checkWin();
  gameState.value.currentPlayerO = !gameState.value.currentPlayerO;
  startTurn();
};

const startTurn = () => {
  gameState.value.currentTurn += 1;
  gameState.value.isRunning = true;
};

const checkWin = () => {
  if (gameState.value.currentTurn < 4) return;
  const currentPlayer: string = gameState.value.currentPlayerO ? "O" : "X";

  if (
    (gameState.value.field[0] === currentPlayer &&
      gameState.value.field[1] === currentPlayer &&
      gameState.value.field[2] === currentPlayer) ||
    (gameState.value.field[3] === currentPlayer &&
      gameState.value.field[4] === currentPlayer &&
      gameState.value.field[5] === currentPlayer) ||
    (gameState.value.field[6] === currentPlayer &&
      gameState.value.field[7] === currentPlayer &&
      gameState.value.field[8] === currentPlayer) ||
    (gameState.value.field[0] === currentPlayer &&
      gameState.value.field[3] === currentPlayer &&
      gameState.value.field[6] === currentPlayer) ||
    (gameState.value.field[1] === currentPlayer &&
      gameState.value.field[4] === currentPlayer &&
      gameState.value.field[7] === currentPlayer) ||
    (gameState.value.field[2] === currentPlayer &&
      gameState.value.field[5] === currentPlayer &&
      gameState.value.field[8] === currentPlayer) ||
    (gameState.value.field[0] === currentPlayer &&
      gameState.value.field[4] === currentPlayer &&
      gameState.value.field[8] === currentPlayer) ||
    (gameState.value.field[2] === currentPlayer &&
      gameState.value.field[4] === currentPlayer &&
      gameState.value.field[6] === currentPlayer)
  ) {
    return triggerWin();
  }
};

const triggerWin = () => {
  console.log("WIN!");
};
</script>

<template>
  GAMEFIELD
  {{ gameState }}
  <div class="gamefield">
    <button
      class="gamefield__btn"
      v-for="(column, i) in gameState.field"
      type="button"
      @click="() => handleClick(i)"
      :disabled="!gameState.isRunning || column !== ''">
      {{ i + ", " }} {{ column }}
    </button>
  </div>
</template>

<style scoped>
.gamefield {
  display: flex;
  flex-wrap: wrap;
  width: 310px;
}

.gamefield__btn {
  min-height: 3rem;
  width: 100px;
}
</style>
