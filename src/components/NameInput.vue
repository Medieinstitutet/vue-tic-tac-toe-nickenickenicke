<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  i: number;
}>();

let playerSymbol: string = "";
if (props.i === 0) playerSymbol = "O";
if (props.i === 1) playerSymbol = "X";

const inputName = ref("");

const emit = defineEmits<{
  (e: "nameSubmit", name: string): void;
}>();

const handleSubmit = () => {
  emit("nameSubmit", inputName.value);
  inputName.value = "";
};
</script>

<template>
  <div>
    <label :for="'player' + playerSymbol + 'name'">
      Spelare {{ playerSymbol }}
    </label>
    <input
      type="text"
      :id="'player' + playerSymbol + 'name'"
      v-model="inputName" />
    <button @click.prevent="handleSubmit">Spara</button>
  </div>
</template>

<style scoped></style>
