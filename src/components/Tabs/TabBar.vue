<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  tabItems: string[];
}>();

const emit = defineEmits<{
  (e: "onChange", value: number): void;
}>();

const selectedTab = ref(0);

const onTabChange = (value: number) => {
  emit('onChange', value);
  selectedTab.value = value;
}

</script>

<template>
  <ul class="bar-list">
    <li
      v-for="(item, idx) in tabItems"
      :key="idx"
      :class="[
        'bar-list__item',
        {
          active: selectedTab === idx,
        },
      ]"
      @click="() => onTabChange(idx)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.bar-list {
  display: flex;

  &__item {
    list-style: none;
    color: var(--dark);
    @include fn-title;
    cursor: pointer;
    
    &:nth-child(2n) {
      margin-left: 18px;
    }
  }
}

.active {
  box-shadow: inset 0px -2px 0px var(--dark-blue);
}
</style>
