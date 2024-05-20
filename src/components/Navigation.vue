<script setup lang="ts">
defineProps<{
  gameState: boolean;
}>();

defineEmits<{
  (e: "handleNewGame"): void;
  (e: "handleShowScoreboard"): void;
  (e: "handleShowNames"): void;
  (e: "handleShowClearStatistics"): void;
}>();
</script>

<template>
  <nav>
    <button @click.prevent="$emit('handleNewGame')" :disabled="gameState">
      New game
    </button>
    <button @click.prevent="$emit('handleShowScoreboard')">Scoreboard</button>
    <button @click.prevent="$emit('handleShowNames')">Change names</button>
    <button @click.prevent="$emit('handleShowClearStatistics')">
      Clear statistics
    </button>
  </nav>
</template>

<style scoped></style>
