<script setup lang="ts">
import { Player } from "../models/Player";

defineProps<{
  players: Player[];
}>();
</script>

<template>
  <h3 class="modal__heading">Scoreboard</h3>
  <section class="modal__content modal__content--scoreboard">
    <table class="scoreboard">
      <thead>
        <tr>
          <td>Symbol</td>
          <td>Name</td>
          <td>Score</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, i) in players">
          <td v-if="i === 0">O</td>
          <td v-else>X</td>
          <td>{{ player.name }}</td>
          <td>{{ player.score }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
