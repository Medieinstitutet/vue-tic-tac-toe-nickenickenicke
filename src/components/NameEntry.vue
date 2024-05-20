<script setup lang="ts">
import { Player } from "../models/Player";
import NameInput from "./NameInput.vue";

defineProps<{
  players: Player[];
}>();

const emit = defineEmits<{
  (e: "nameChange", name: string, i: number): void;
}>();

const handleNameChange = (name: string, i: number) => {
  emit("nameChange", name, i);
};
</script>

<template>
  <section>
    ANGE NAMN
    <NameInput
      v-for="(player, i) in players"
      :i="i"
      @name-submit="handleNameChange" />
  </section>
</template>

<style scoped></style>
