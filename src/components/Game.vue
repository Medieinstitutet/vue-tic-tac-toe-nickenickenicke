<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import { IState } from "../models/IState";
import NameEntry from "./NameEntry.vue";
import Scoreboard from "./Scoreboard.vue";
import GameField from "./GameField.vue";
import Navigation from "./Navigation.vue";
import ClearStatistics from "./ClearStatistics.vue";

const state = ref<IState>({
  players: [new Player(), new Player()],
  game: {
    field: ["", "", "", "", "", "", "", "", ""],
    isRunning: true,
    currentPlayerO: false,
    currentTurn: 0,
  },
});

const navigationState = ref<{
  showNameInput: boolean;
  showScoreboard: boolean;
  showClearStatistics: boolean;
}>({
  showNameInput: false,
  showScoreboard: false,
  showClearStatistics: false,
});

const LOCAL_STORAGE_KEY: string = "ticTacStorage";

if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
  state.value = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "");
}

const saveState = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.value));
};

const playerNameChange = (name: string, i: number) => {
  state.value.players[i].name = name;
  saveState();
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

const fieldClick = (i: number) => {
  if (state.value.game.currentPlayerO) {
    state.value.game.field[i] = "O";
  }
  if (!state.value.game.currentPlayerO) {
    state.value.game.field[i] = "X";
  }
  endTurn();
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
  if (state.value.game.currentTurn === 9) return triggerDraw();

  startTurn();
};

const triggerWin = () => {
  state.value.game.isRunning = false;

  if (state.value.game.currentPlayerO === true) state.value.players[0].score++;
  if (state.value.game.currentPlayerO === false) state.value.players[1].score++;

  console.log("WIN!");
  saveState();
};

const triggerDraw = () => {
  console.log("DRAW!");
  state.value.game.isRunning = false;
  saveState();
};

const startNewRound = () => {
  state.value.game.currentPlayerO = Math.random() < 0.5;
  state.value.game.currentTurn = 0;
  state.value.game.field = ["", "", "", "", "", "", "", "", ""];
  startTurn();
};

const clearStatistics = () => {
  state.value.players[0].score = 0;
  state.value.players[1].score = 0;
  navigationState.value.showClearStatistics = false;
  saveState();
};
</script>

<template>
  <NameEntry
    v-if="navigationState.showNameInput"
    :players="state.players"
    @name-change="playerNameChange" />
  <Scoreboard :players="state.players" />
  <GameField
    :game-state="state.game"
    @field-click="
      (i) => {
        fieldClick(i);
      }
    " />
  <Navigation
    :game-state="state.game.isRunning"
    @handle-new-game="startNewRound"
    @handle-show-names="
      () => {
        navigationState.showNameInput = true;
      }
    "
    @handle-show-clear-statistics="
      () => {
        navigationState.showClearStatistics = true;
      }
    " />
  <ClearStatistics
    v-if="navigationState.showClearStatistics"
    @handle-clear-statistics-toggle="
      () => {
        navigationState.showClearStatistics = false;
      }
    "
    @handle-clear-statistics="clearStatistics" />
</template>

<style scoped></style>
