<script setup lang="ts">
import { ref } from "vue";
import type { AuthPageTypes } from "@/types/common.model";

import SignInForm from "../components/AuthForms/AuthForm.vue";
import TabBar from '../components/Tabs/TabBar.vue';

const pageTypesValue = ['Sign Up', 'Sing In']

const pageType = ref<AuthPageTypes>("signUp");

const onChange = (val: number) => {
  pageType.value = val === 0 ? 'signUp' : 'signIn';
};

</script>

<template>
  <section>Auth</section>
  <TabBar :tabItems="pageTypesValue" @onChange="onChange"/>
  <SignInForm class="auth-form" :pageType="pageType" />
</template>

<style lang="scss" scoped>
.auth-form {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  row-gap: 63px;
}
</style>
