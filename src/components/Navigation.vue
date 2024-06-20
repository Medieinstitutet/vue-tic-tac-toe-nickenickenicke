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
    <button
      @click.prevent="$emit('handleNewGame')"
      :disabled="gameState"
      class="nav__btn">
      New game
    </button>
    <button @click.prevent="$emit('handleShowScoreboard')" class="nav__btn">
      Scoreboard
    </button>
    <button @click.prevent="$emit('handleShowNames')" class="nav__btn">
      Change names
    </button>
    <button
      @click.prevent="$emit('handleShowClearStatistics')"
      class="nav__btn">
      Clear statistics
    </button>
  </nav>
</template>

<style scoped></style>
