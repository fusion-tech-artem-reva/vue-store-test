<script setup lang='ts'>
defineProps<{
  btnTitle: string;
  type: 'primary' | 'secondary';
  isLoading?: boolean;
}>();

const { onClick } = defineEmits<{
  onClick: () => void;
}>()

</script>

<template>
  <button @click="onClick" class="common-button">
    <span class="common-button__title">
      {{btnTitle}}
    </span>
  </button>
</template>

<style lang='scss' scoped>
.common-button {
  background-color: var(--dark);
  color: var(--white);

  &__title {
  }
}
</style>