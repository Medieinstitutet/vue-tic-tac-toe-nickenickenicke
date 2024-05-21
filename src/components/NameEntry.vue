<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "nameChange", names: string[]): void;
}>();

const playerNames = ref<string[]>(["", ""]);

const handleNameChange = () => {
  emit("nameChange", playerNames.value);
};
</script>

<template>
  <h3 class="modal__heading">Enter Names</h3>

  <section class="modal__content modal__content--nameentry">
    <form class="modal__form" @submit.prevent="handleNameChange">
      <label for="playerO" class="modal__label">Player O</label>
      <input
        type="text"
        name="playerO"
        id="playerO"
        class="modal__input"
        v-model="playerNames[0]" />
      <label for="playerX" class="modal__label">Player X</label>
      <input
        type="text"
        name="playerX"
        id="playerX"
        class="modal__input"
        v-model="playerNames[1]" />
      <button class="modal__btn">Submit</button>
    </form>
  </section>
</template>

<style scoped></style>
