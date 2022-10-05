<script setup lang="ts">
import { ref, watchEffect } from "vue";
import MainButton from "../UI/buttons/MainButton.vue";
import TextInput from "../UI/form/inputs/TextInput.vue";
import EmailIcon from "../UI/icons/EmailIcon.vue";

import { getThemeValue } from "@/utils/getThemValue";

const name = ref("");
const inputStatuses = ref({ isError: false, success: false });
watchEffect(() => {
  inputStatuses.value = {
    isError: name.value.length >=6,
    success: name.value.length > 3 && name.value.length < 6
  }
})
</script>

<template>
  <header>
    <div>
      <img src="@/assets/images/svg/logo.svg" />
      <div class="test">
        <TextInput
          v-model="name"
          label="Email"
          helpTextDefault="Here’s a hint that might help you."
          help-text-error="Email is not correct"
          help-text-success="Username available!"
          :isError="inputStatuses.isError"
          :success="inputStatuses.success"
        >
          <template #left-icon="slotProps">
            <EmailIcon
              :color="
                slotProps.isFocused ? getThemeValue('dark-blue') : undefined
              "
            />
          </template>
        </TextInput>
      </div>
    </div>
    <h1>{{ name }}</h1>
  </header>
</template>

<style lang="scss" scoped>
header {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}

.test {
  max-width: 325px;
}
</style>
