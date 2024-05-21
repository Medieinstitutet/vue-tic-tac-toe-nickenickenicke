<script setup lang="ts">
defineEmits<{
  (e: "handleClearStatisticsToggle"): void;
  (e: "handleClearStatistics"): void;
}>();
</script>

<template>
  <section class="modal__inner-container">
    <p>
      Are you sure you want to clear the statistics? This will start a new
      round.
    </p>
    <button @click.prevent="$emit('handleClearStatistics')" type="button">
      Yes
    </button>
    <button @click.prevent="$emit('handleClearStatisticsToggle')" type="button">
      No
    </button>
  </section>
</template>

<style scoped></style>
