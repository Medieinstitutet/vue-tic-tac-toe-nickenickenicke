<script setup lang="ts">
import { ref } from "vue";
import { Players } from "../models/Players";
import { Player } from "../models/Player";

const state = ref<{
  players: Players;
  game: {
    isRunning: boolean;
    currentPlayerX: boolean;
  };
}>({
  players: new Players(new Player(), new Player()),
  game: { isRunning: false, currentPlayerX: false },
});
</script>

<template>Hello World</template>

<style scoped></style>
