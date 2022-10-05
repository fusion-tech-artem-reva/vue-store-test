<script setup lang="ts">
import { withDefaults } from "vue";

withDefaults(defineProps<{
  width?: string | number;
  height?: string | number;
  color?: string;
}>(), {
  width: 14,
  height: 14,
  color: '#B9BAC4',
});
</script>

<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :color="color"
  >
    <path
      d="M1 1L13 13"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1 13L13 1.00002"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style lang="scss" scoped></style>
