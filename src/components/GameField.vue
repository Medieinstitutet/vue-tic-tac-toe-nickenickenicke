<script setup lang="ts">
import { ref } from "vue";

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
  display: flex;
  flex-wrap: wrap;
  width: 310px;
}

.gamefield__btn {
  min-height: 3rem;
  width: 100px;
}
</style>
