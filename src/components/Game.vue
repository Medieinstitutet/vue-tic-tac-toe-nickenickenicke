<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Player } from "../models/Player";
import { IState } from "../models/IState";

import NameEntry from "./NameEntry.vue";
import Scoreboard from "./Scoreboard.vue";
import GameField from "./GameField.vue";
import Navigation from "./Navigation.vue";
import Modal from "./Modal.vue";
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
  showModal: boolean;
  showNameInput: boolean;
  showScoreboard: boolean;
  showClearStatistics: boolean;
  showGameResult: boolean;
  showCurrentPlayer: boolean;
}>({
  showModal: false,
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
    toggleNameInput();
    startNewRound();
  }
});

const saveState = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.value));
};

const playerNameChange = (names: string[]) => {
  state.value.players[0].name = names[0];
  state.value.players[1].name = names[1];
  if (state.value.game.isRunning) displayCurrentPlayer();
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

const toggleModal = () => {
  navigationState.value.showModal = !navigationState.value.showModal;
};

const toggleScoreboard = () => {
  toggleModal();
  navigationState.value.showScoreboard = !navigationState.value.showScoreboard;
};

const toggleNameInput = () => {
  toggleModal();
  navigationState.value.showNameInput = !navigationState.value.showNameInput;
};

const toggleClearStatistics = () => {
  toggleModal();
  navigationState.value.showClearStatistics =
    !navigationState.value.showClearStatistics;
};

const clearModal = () => {
  navigationState.value.showModal = false;
  navigationState.value.showScoreboard = false;
  navigationState.value.showNameInput = false;
  navigationState.value.showClearStatistics = false;
};
</script>

<template>
  <Modal
    :navigation-state="navigationState"
    :players="state.players"
    @clear-modal="clearModal"
    @clear-statistics="clearStatistics"
    @player-name-change="playerNameChange" />
  <article class="gamecontainer">
    <section v-if="navigationState.showGameResult" class="game-message">
      {{ messagesState.resultMessage }}
    </section>
    <section v-if="navigationState.showCurrentPlayer" class="game-message">
      {{ messagesState.currentPlayerMessage }}
    </section>
    <GameField
      :game-state="state.game"
      @field-click="
        (i) => {
          fieldClick(i);
        }
      " />
  </article>
  <Navigation
    :game-state="state.game.isRunning"
    @handle-new-game="startNewRound"
    @handle-show-names="
      () => {
        toggleNameInput();
      }
    "
    @handle-show-clear-statistics="
      () => {
        toggleClearStatistics();
      }
    "
    @handle-show-scoreboard="
      () => {
        toggleScoreboard();
      }
    " />
</template>

<style scoped></style>
