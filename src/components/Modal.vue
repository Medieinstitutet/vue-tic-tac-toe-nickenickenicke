<script setup lang="ts">
import { Player } from "../models/Player";

import NameEntry from "./NameEntry.vue";
import Scoreboard from "./Scoreboard.vue";
import ClearStatistics from "./ClearStatistics.vue";

defineProps<{
  navigationState: {
    showModal: boolean;
    showNameInput: boolean;
    showScoreboard: boolean;
    showClearStatistics: boolean;
    showGameResult: boolean;
    showCurrentPlayer: boolean;
  };
  players: Player[];
}>();

const emit = defineEmits<{
  (e: "clearModal"): void;
  (e: "playerNameChange", name: string, i: number): void;
  (e: "clearStatistics"): void;
}>();

const handleOuterModalClick = (e: Event) => {
  if (e.target === document.querySelector("div.modal-outer")) {
    emit("clearModal");
  }
};
</script>

<template>
  <div
    class="modal-outer"
    v-if="navigationState.showModal"
    @click="
      (e) => {
        handleOuterModalClick(e);
      }
    ">
    <section class="modal">
      <button class="modal__close-btn" @click.prevent="$emit('clearModal')">
        X
      </button>
      <NameEntry
        v-if="navigationState.showNameInput"
        :players="players"
        @name-change="
          (name, i) => {
            emit('playerNameChange', name, i);
          }
        " />
      <Scoreboard v-if="navigationState.showScoreboard" :players="players" />
      <ClearStatistics
        v-if="navigationState.showClearStatistics"
        @handle-clear-statistics-toggle="$emit('clearModal')"
        @handle-clear-statistics="$emit('clearStatistics')" />
    </section>
  </div>
</template>

<style scoped></style>
