<script setup lang="ts">
import { onMounted, ref } from "vue";
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
  showGameResult: boolean;
  showCurrentPlayer: boolean;
}>({
  showNameInput: false,
  showScoreboard: false,
  showClearStatistics: false,
  showGameResult: false,
  showCurrentPlayer: true,
});

const messagesState = ref<{
  resultMessage: string;
  currentPlayerMessage: string;
}>({
  resultMessage: "",
  currentPlayerMessage: "",
});

const LOCAL_STORAGE_KEY: string = "ticTacStorage";

onMounted(() => {
  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    state.value = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "");
    if (state.value.game.isRunning) displayCurrentPlayer();
    if (!state.value.game.isRunning) startNewRound();
  }

  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    navigationState.value.showNameInput = true;
    startNewRound();
  }
});

const saveState = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.value));
};

const playerNameChange = (name: string, i: number) => {
  state.value.players[i].name = name;
  saveState();
};

const startNewRound = () => {
  state.value.game.currentPlayerO = Math.random() < 0.5;
  state.value.game.currentTurn = 0;
  state.value.game.field = ["", "", "", "", "", "", "", "", ""];
  navigationState.value.showCurrentPlayer = true;
  navigationState.value.showGameResult = false;
  startTurn();
};

const startTurn = () => {
  state.value.game.isRunning = true;
  state.value.game.currentPlayerO = !state.value.game.currentPlayerO;
  state.value.game.currentTurn += 1;
  displayCurrentPlayer();
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
  if (state.value.game.currentTurn === 9) return triggerDraw();

  startTurn();
};

const triggerWin = () => {
  state.value.game.isRunning = false;

  if (state.value.game.currentPlayerO === true) {
    state.value.players[0].score++;
    displayResult("O");
  }
  if (state.value.game.currentPlayerO === false) {
    state.value.players[1].score++;
    displayResult("X");
  }

  saveState();
};

const triggerDraw = () => {
  displayResult("draw");
  state.value.game.isRunning = false;
  saveState();
};

const displayResult = (winner: string) => {
  navigationState.value.showGameResult = true;
  navigationState.value.showCurrentPlayer = false;
  if (winner === "X") {
    messagesState.value.resultMessage =
      state.value.players[1].name + " X wins!";
  } else if (winner === "O") {
    messagesState.value.resultMessage =
      state.value.players[0].name + " O wins!";
  } else {
    messagesState.value.resultMessage = "Draw!";
  }
};

const displayCurrentPlayer = () => {
  navigationState.value.showCurrentPlayer = true;
  let currentPlayerName: string = "";
  if (state.value.game.currentPlayerO) {
    currentPlayerName =
      state.value.players[0].name === "" ? "O" : state.value.players[0].name;
  }
  if (!state.value.game.currentPlayerO) {
    currentPlayerName =
      state.value.players[1].name === "" ? "X" : state.value.players[1].name;
  }
  messagesState.value.currentPlayerMessage =
    "It is your turn, " + currentPlayerName + "!";
};

const clearStatistics = () => {
  state.value.players = [new Player(), new Player()];
  navigationState.value.showClearStatistics = false;
  navigationState.value.showNameInput = true;
  startNewRound();
};
</script>

<template>
  <NameEntry
    v-if="navigationState.showNameInput"
    :players="state.players"
    @name-change="playerNameChange" />
  <Scoreboard v-if="navigationState.showScoreboard" :players="state.players" />
  <section v-if="navigationState.showGameResult">
    {{ messagesState.resultMessage }}
  </section>
  <section v-if="navigationState.showCurrentPlayer">
    {{ messagesState.currentPlayerMessage }}
  </section>
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
        navigationState.showNameInput = !navigationState.showNameInput;
      }
    "
    @handle-show-clear-statistics="
      () => {
        navigationState.showClearStatistics =
          !navigationState.showClearStatistics;
      }
    "
    @handle-show-scoreboard="
      () => {
        navigationState.showScoreboard = !navigationState.showScoreboard;
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
