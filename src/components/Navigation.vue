<script setup lang="ts">
defineProps<{
  gameState: boolean;
}>();

defineEmits<{
  (e: "handleNewGame"): void;
}>();
</script>

<template>
  <nav>
    <button @click.prevent="$emit('handleNewGame')" :disabled="gameState">
      New game
    </button>
    <button>Scoreboard</button>
    <button>Change names</button>
    <button>Clear statistics</button>
  </nav>
</template>

<style scoped></style>
