<script setup lang="ts">
defineEmits<{
  (e: "handleClearStatisticsToggle"): void;
  (e: "handleClearStatistics"): void;
}>();
</script>

<template>
  <aside class="modal">
    <p>Are you shure you want to clear the statistics?</p>
    <button @click.prevent="$emit('handleClearStatistics')" type="button">
      Yes
    </button>
    <button @click.prevent="$emit('handleClearStatisticsToggle')" type="button">
      No
    </button>
  </aside>
</template>

<style scoped></style>
