<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import NameEntry from "./NameEntry.vue";
import Scoreboard from "./Scoreboard.vue";
import GameField from "./GameField.vue";

const state = ref<{
  players: Player[];
}>({
  players: [new Player(), new Player()],
});

const playerNameChange = (name: string, i: number) => {
  state.value.players[i].name = name;
};
</script>

<template>
  Player names in state
  <ul>
    <li v-for="(player, i) in state.players">{{ i + ". " + player.name }}</li>
  </ul>
  <NameEntry :players="state.players" @name-change="playerNameChange" />
  <Scoreboard :players="state.players" />
  <GameField />
</template>

<style scoped></style>
