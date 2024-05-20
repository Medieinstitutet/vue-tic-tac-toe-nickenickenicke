<script setup lang="ts">
import { ref } from "vue";

const gameState = ref<{
  field: [string[], string[], string[]];
  isRunning: boolean;
  currentPlayerO: boolean;
}>({
  field: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  isRunning: true,
  currentPlayerO: false,
});

const handleClick = (i: number, j: number) => {
  if (gameState.value.currentPlayerO) {
    gameState.value.field[i][j] = "O";
  }
  if (!gameState.value.currentPlayerO) {
    gameState.value.field[i][j] = "X";
  }
  endTurn();
};

const endTurn = () => {
  gameState.value.isRunning = false;
  gameState.value.currentPlayerO = !gameState.value.currentPlayerO;
  startTurn();
};

const startTurn = () => {
  gameState.value.isRunning = true;
};
</script>

<template>
  GAMEFIELD
  {{ gameState }}
  <table>
    <tbody>
      <tr v-for="(row, i) in gameState.field">
        <td v-for="(column, j) in row">
          {{ i + ", " + j }}
          <button
            type="button"
            @click="() => handleClick(i, j)"
            :disabled="!gameState.isRunning || column !== ''">
            {{ column }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
button {
  min-width: 3rem;
  min-height: 3rem;
}
</style>
