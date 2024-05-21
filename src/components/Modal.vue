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
</script>

<template>
  <div class="modal-outer" v-if="navigationState.showModal">
    <section class="modal">
      <button @click.prevent="$emit('clearModal')">X</button>
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
        @handle-clear-statistics-toggle="
          () => {
            navigationState.showClearStatistics = false;
          }
        "
        @handle-clear-statistics="$emit('clearStatistics')" />
    </section>
  </div>
</template>

<style scoped></style>
