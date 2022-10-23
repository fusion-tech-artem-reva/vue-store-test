<script setup lang="ts">
import type { ButtonHTMLAttributes } from "@vue/runtime-dom";

const props = defineProps<{
  btnTitle: string;
  btnType?: ButtonHTMLAttributes["type"];
  type: "primary" | "secondary";
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}>();

defineEmits<{
  (e: 'onClick'):void;
}>();

const mainClassName = `common-button__${props.type ?? "primary"}`;
</script>

<template>
  <button
    @click="$emit('onClick')"
    :type="btnType"
    :class="[
      'common-button',
      mainClassName,
      { [`${mainClassName}--disabled`]: disabled },
      className,
    ]"
  >
    <span class="common-button__title" v-if="!isLoading">
      {{ btnTitle }}
    </span>
    <div class="spiner" v-else></div>
  </button>
</template>

<style lang="scss" scoped>
.common-button {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 10px 50px;
  width: 100%;
  border-radius: 16px;
  width: max-content;

  &__primary {
    background-color: var(--dark-blue);
    color: var(--white);

    &:hover {
      background-color: var(--dark);
    }

    &--disabled {
      background-color: var(--dark-grey);

      &:hover {
        background-color: var(--dark-grey);
      }
    }
  }

  &__secondary {
    background-color: var(--white);
    color: var(--dark);
  }

  &__title {
    @include fn-text;
  }
}

.spiner {
  border-radius: 50%;
  height: 16px;
  width: 16px;
  border-width: 3px;
  border-style: solid;
  animation: spinerAnimation 0.6s infinite linear backwards;
  border-right-color: transparent;
}

.common-button__primary .spiner {
  border-left-color: var(--white);
  border-top-color: var(--white);
  border-bottom-color: var(--white);
}

.common-button__secondary .spiner {
  border-left-color: var(--dark-blue);
  border-top-color: var(--dark-blue);
  border-bottom-color: var(--dark-blue);
}

@keyframes spinerAnimation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
