<script setup lang="ts">
import type { AuthRequiredFields } from "@/api/authentication";
import { useUserStore } from "@/stores/user";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as Yup from "yup";
import { useToast } from "vue-toastification";
import { AxiosError } from "axios";

import TextInput from "../UI/form/inputs/TextInput.vue";
import MainButton from "../UI/buttons/MainButton.vue";
import EmailIcon from "../UI/icons/EmailIcon.vue";
import PasswordIcon from "../UI/icons/PasswordIcon.vue";

import { getThemeValue } from "@/utils/getThemValue";
import { authenticationScheme } from "@/utils/validationSchemes/authenticationScheme";
import { useFormErrorsWatcher } from "./useFormErrorsWatcher";
import type { AuthPageTypes } from '@/types/common.model';
import { computed } from '@vue/reactivity';

const props = defineProps<{
  pageType: AuthPageTypes;
}>();


const formValues = ref<AuthRequiredFields>({
  email: null,
  password: null,
  confirmedPassword: null,
});

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
      type: props.pageType,
    });

    const pathTo = route.query.redirectTo || "/";
    if (typeof pathTo !== "string") return;

    router.push({ path: pathTo });
  } catch (err) {
    console.log('err', err)
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

const buttonTitle = computed(() => {
  return props.pageType === 'signIn' ? 'Sign In' : 'Sign Up';
});

</script>

<template>
  <form @submit="onSubmit">
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
    <MainButton type="primary" btnType="submit" :btnTitle="buttonTitle" />
  </form>
</template>

<style lang="scss" scoped></style>
