<script setup lang="ts">
const props = defineProps<{
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

const atMouseOver = (e: Event) => {
  if (!(e.target as HTMLButtonElement).disabled) {
    (e.target as HTMLButtonElement).innerHTML = props.gameState.currentPlayerO
      ? "O"
      : "X";
  }
};

const atMouseLeave = (e: Event) => {
  if (!(e.target as HTMLButtonElement).disabled) {
    (e.target as HTMLButtonElement).innerHTML = "";
  }
};
</script>

<template>
  <div class="gamefield">
    <button
      class="gamefield__btn"
      v-for="(field, i) in gameState.field"
      type="button"
      @click="() => $emit('fieldClick', i)"
      @mouseover="(e) => atMouseOver(e)"
      @mouseleave="(e) => atMouseLeave(e)"
      :disabled="!gameState.isRunning || field !== ''">
      {{ field }}
    </button>
  </div>
</template>

<style scoped>
.gamefield {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: clamp(400px, 400px, 100vw);
  aspect-ratio: 1/1;
  border-left: var(--border);
  border-top: var(--border);
}

.gamefield__btn {
  min-height: 3rem;
  background-color: var(--color-secondary);
  color: var(--color-primary);
  border: none;
  border-right: var(--border);
  border-bottom: var(--border);
  font-size: 3rem;
  font-weight: 800;
}
</style>
