<script setup lang="ts">
import uuid4 from "uuid4";
import { toRefs, type InputHTMLAttributes } from "@vue/runtime-dom";
import { ref, watchEffect, computed } from "vue";
import CloseIcon from "../../icons/CloseIcon.vue";
import { getThemeValue } from "@/utils/getThemValue";

const props = defineProps<{
  label: string;
  type?: InputHTMLAttributes["type"];
  modelValue?: string;
  placeHolder?: string;
  helpTextSuccess?: string;
  helpTextDefault?: string;
  helpTextError?: string;
  isError?: boolean;
  success?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const {
  modelValue,
  isError,
  success,
  helpTextDefault,
  helpTextError,
  helpTextSuccess,
} = toRefs(props);
const inputFocused = ref(false);
const inputWrapperFocused = ref(false);
const isFullInputFocused = ref(false);
const hintMessage = ref<{
  message?: string;
  type: "default" | "error" | "success";
}>({
  message: props.helpTextDefault,
  type: "default",
});

const inputId = `text_input${uuid4()}`;

watchEffect(() => {
  isFullInputFocused.value = inputFocused.value || inputWrapperFocused.value;
});

watchEffect(() => {
  const message = isError?.value
    ? helpTextError?.value
    : success?.value
    ? helpTextSuccess?.value
    : helpTextDefault?.value;

  const type = isError?.value
    ? "error"
    : success?.value
    ? "success"
    : "default";

  hintMessage.value = {
    type,
    message,
  };
});

const iconColor = computed(() => {
  return getThemeValue(
    hintMessage.value.type !== "default" ? hintMessage.value.type : undefined
  );
});

const onClick = () => {
  emit("update:modelValue", "");
};

</script>

<template>
  <div class="input-wrapper" :class="`input-status--${hintMessage.type}`">
    <div
      tabindex="1"
      :class="[
        'input-wrapper__inner-box',
        {
          'input-wrapper__inner-box--focused': isFullInputFocused,
        },
      ]"
      @focus="inputWrapperFocused = true"
      @blur="inputWrapperFocused = false"
    >
      <label class="input">
        <div class="input__left-icon">
          <slot name="left-icon" :isFocused="isFullInputFocused"></slot>
        </div>
        <div class="input__content-area">
          <span
            :class="[
              'input__label',
              {
                'input__label--active': isFullInputFocused || modelValue,
              },
            ]"
            >{{label}}</span
          >
          <input
            class="input__item"
            :type="type ?? 'text'"
            :value="modelValue"
            :id="inputId"
            @input="
              $emit(
                'update:modelValue',
                ($event?.target as HTMLInputElement).value
              )
            "
            :placeholder="placeHolder"
            @blur="inputFocused = false"
            @focus="inputFocused = true"
          />
        </div>
      </label>
      <label
        class="input__right-icon"
        :for="inputId"
        @mousedown="$event.preventDefault()"
        @click="onClick"
        v-if="isFullInputFocused"
      >
        <CloseIcon :color="iconColor" />
      </label>
    </div>
    <span class="helper-text" v-if="hintMessage.message">
      {{ hintMessage.message }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;

  &__inner-box {
    display: flex;
    border-radius: 16px;
    border: 2px solid transparent;
    height: 64px;
    padding: 6px 24px;
    background-color: var(--light);

    &--focused {
      border-color: var(--dark-blue);
    }
  }
}
.input {
  display: flex;
  align-items: center;
  flex-grow: 1;

  &__item {
    background-color: transparent;
    border: none;
    outline: none;
    transform: translateY(14px);
    @include fn-text-small;
  }

  &__right-icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
  }

  &__left-icon {
  }

  &__label {
    position: absolute;
    transition: transform 0.1s linear;
    @include fn-label;

    &--active {
      transform: translateY(-10px);
    }
  }

  &__content-area {
    position: relative;
    padding-left: 16px;
  }
}

.helper-text {
  @include fn-label;
  position: absolute;
  transform: translateY(100%);
  bottom: -9px;
  left: 0;
  color: var(--dark-blue);
}

.input-wrapper.input-status {
  &--success {
    & .input-wrapper__inner-box {
      border-color: var(--success);
    }

    & .helper-text {
      color: var(--success);
    }
  }

  &--error {
    & .input-wrapper__inner-box {
      border-color: var(--error);
    }

    & .helper-text {
      color: var(--error);
    }
  }
}
</style>
