<script setup lang="ts">
defineEmits<{
  (e: "handleClearStatisticsToggle"): void;
  (e: "handleClearStatistics"): void;
}>();
</script>

<template>
  <h3 class="modal__heading">Clear Statistics</h3>

  <section class="modal__content modal__content--clearstatistics">
    <p class="modal__p">
      Are you sure you want to clear the statistics? This will reset everything
      and start a new round.
    </p>
    <button
      @click.prevent="$emit('handleClearStatistics')"
      type="button"
      class="modal__btn">
      Yes
    </button>
    <button
      @click.prevent="$emit('handleClearStatisticsToggle')"
      type="button"
      class="modal__btn modal__btn--secondary">
      No
    </button>
  </section>
</template>

<style scoped></style>
