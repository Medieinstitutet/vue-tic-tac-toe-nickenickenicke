<script setup lang="ts">
defineProps<{
  gameState: {
    field: string[];
    isRunning: boolean;
    currentPlayerO: boolean;
    currentTurn: number;
  };
}>();

defineEmits<{
  (e: "fieldClick", i: number): void;
}>();
</script>

<template>
  <div class="gamefield">
    <button
      class="gamefield__btn"
      v-for="(field, i) in gameState.field"
      type="button"
      @click="() => $emit('fieldClick', i)"
      :disabled="!gameState.isRunning || field !== ''">
      {{ field }}
    </button>
  </div>
</template>

<style scoped>
.gamefield {
  display: flex;
  flex-wrap: wrap;
  width: 310px;
}

.gamefield__btn {
  min-height: 3rem;
  width: 100px;
}
</style>
