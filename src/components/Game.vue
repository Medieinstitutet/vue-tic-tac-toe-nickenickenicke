<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import NameEntry from "./NameEntry.vue";
import Scoreboard from "./Scoreboard.vue";
import GameField from "./GameField.vue";
import { IState } from "../models/IState";

const state = ref<IState>({
  players: [new Player(), new Player()],
  game: {
    field: ["", "", "", "", "", "", "", "", ""],
    isRunning: true,
    currentPlayerO: false,
    currentTurn: 0,
  },
});
const LOCAL_STORAGE_KEY: string = "ticTacStorage";

if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
  state.value = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "");
}

const playerNameChange = (name: string, i: number) => {
  state.value.players[i].name = name;
  saveState();
};

const fieldClick = (i: number) => {
  if (state.value.game.currentPlayerO) {
    state.value.game.field[i] = "O";
  }
  if (!state.value.game.currentPlayerO) {
    state.value.game.field[i] = "X";
  }
  endTurn();
};

const startTurn = () => {
  state.value.game.isRunning = true;
  state.value.game.currentPlayerO = !state.value.game.currentPlayerO;
  state.value.game.currentTurn += 1;
  saveState();
};

const endTurn = () => {
  state.value.game.isRunning = false;
  checkWin();
};

const checkWin = () => {
  if (state.value.game.currentTurn < 4) return startTurn();

  const currentPlayer: string = state.value.game.currentPlayerO ? "O" : "X";

  if (
    (state.value.game.field[0] === currentPlayer &&
      state.value.game.field[1] === currentPlayer &&
      state.value.game.field[2] === currentPlayer) ||
    (state.value.game.field[3] === currentPlayer &&
      state.value.game.field[4] === currentPlayer &&
      state.value.game.field[5] === currentPlayer) ||
    (state.value.game.field[6] === currentPlayer &&
      state.value.game.field[7] === currentPlayer &&
      state.value.game.field[8] === currentPlayer) ||
    (state.value.game.field[0] === currentPlayer &&
      state.value.game.field[3] === currentPlayer &&
      state.value.game.field[6] === currentPlayer) ||
    (state.value.game.field[1] === currentPlayer &&
      state.value.game.field[4] === currentPlayer &&
      state.value.game.field[7] === currentPlayer) ||
    (state.value.game.field[2] === currentPlayer &&
      state.value.game.field[5] === currentPlayer &&
      state.value.game.field[8] === currentPlayer) ||
    (state.value.game.field[0] === currentPlayer &&
      state.value.game.field[4] === currentPlayer &&
      state.value.game.field[8] === currentPlayer) ||
    (state.value.game.field[2] === currentPlayer &&
      state.value.game.field[4] === currentPlayer &&
      state.value.game.field[6] === currentPlayer)
  ) {
    return triggerWin();
  }

  startTurn();
};

const triggerWin = () => {
  state.value.game.isRunning = false;

  if (state.value.game.currentPlayerO === true) state.value.players[0].score++;
  if (state.value.game.currentPlayerO === false) state.value.players[1].score++;

  console.log("WIN!");
  saveState();
};

const saveState = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.value));
};
</script>

<template>
  Player names in state
  <ul>
    <li v-for="(player, i) in state.players">{{ i + ". " + player.name }}</li>
  </ul>
  <NameEntry :players="state.players" @name-change="playerNameChange" />
  <Scoreboard :players="state.players" />
  <GameField
    :game-state="state.game"
    @field-click="
      (i) => {
        fieldClick(i);
      }
    " />
</template>

<style scoped></style>
