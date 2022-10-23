<script setup lang="ts">
import type { AuthRequiredFields } from "@/api/authentication";
import { useUserStore } from "@/stores/user";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as Yup from "yup";

import TextInput from "../UI/form/inputs/TextInput.vue";
import MainButton from "../UI/buttons/MainButton.vue";
import EmailIcon from "../UI/icons/EmailIcon.vue";
import { getThemeValue } from "@/utils/getThemValue";
import PasswordIcon from "../UI/icons/PasswordIcon.vue";
import { authenticationScheme } from "@/utils/validationSchemes/authenticationScheme";
import { useToast } from "vue-toastification";
import { AxiosError } from "axios";
import { useFormErrorsWatcher } from "./useFormErrorsWatcher";

const formValues = ref<AuthRequiredFields>({
  email: null,
  password: null,
  confirmedPassword: null,
});

const pageType = ref<"signIn" | "signUp">("signIn");

const formErrors = useFormErrorsWatcher({ formValues });

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const toast = useToast();

const onSubmit = async (ev: Event) => {
  ev.preventDefault();
  try {
    await authenticationScheme.validate(formValues.value, {
      abortEarly: false,
    });

    await userStore.authenticateUser({
      ...formValues.value,
      type: pageType.value,
    });

    const pathTo = route.query.redirectTo || "/profile";
    if (typeof pathTo !== "string") return;

    router.push({ path: pathTo });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      err.inner.forEach((error) => {
        if (error.path && error.path in formErrors.value) {
          const errorKey = error.path as keyof AuthRequiredFields;
          formErrors.value[errorKey] = true;
        }
      });
    }
    if (err instanceof AxiosError) {
      toast.error(err.message);
    }
  }
};

const switchPageType = (type: typeof pageType.value) => {
  pageType.value = type;
};
</script>

<template>
  <div>
    <p>Sign Up</p>
    <p>Sign In</p>
  </div>
  <form @submit="onSubmit" class="auth-form">
    <TextInput
      help-text-default="Type your email"
      help-text-error="Incorrect email"
      help-text-success="Available email"
      label="Email"
      v-model="formValues.email"
      :isError="formErrors.email"
    >
      <template #left-icon="{ isFocused }">
        <EmailIcon
          :color="isFocused ? getThemeValue('dark-blue') : undefined"
        />
      </template>
    </TextInput>
    <TextInput
      help-text-default="Type your password"
      help-text-error="Incorrect password"
      help-text-success="Available password"
      label="Password"
      v-model="formValues.password"
      type="password"
      :isError="formErrors.password"
    >
      <template #left-icon="{ isFocused }">
        <PasswordIcon
          :color="isFocused ? getThemeValue('dark-blue') : undefined"
        />
      </template>
    </TextInput>
    <TextInput
      v-if="pageType === 'signUp'"
      help-text-default="Password replay"
      help-text-error="Incorrect password"
      help-text-success="Available password"
      label="Password replay"
      v-model="formValues.confirmedPassword"
      type="password"
      :isError="formErrors.confirmedPassword"
    >
      <template #left-icon="{ isFocused }">
        <PasswordIcon
          :color="isFocused ? getThemeValue('dark-blue') : undefined"
        />
      </template>
    </TextInput>
    <MainButton type="primary" btnType="submit" btnTitle="Sign Up" />
  </form>
</template>

<style lang="scss" scoped></style>
