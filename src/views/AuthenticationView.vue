<script setup lang="ts">
import { ref } from "vue";
import type { AuthPageTypes } from "@/types/common.model";

import SignInForm from "../components/AuthForms/AuthForm.vue";
import TabBar from "../components/Tabs/TabBar.vue";

const pageTypesValue = ["Sign Up", "Sing In"];

const pageType = ref<AuthPageTypes>("signUp");

const onChange = (val: number) => {
  pageType.value = val === 0 ? "signUp" : "signIn";
};
</script>

<template>
  <main class="auth-layout">
    <div class="form-container">
      <TabBar
        :tabItems="pageTypesValue"
        @onChange="onChange"
        class="form-container__headline"
      />
      <SignInForm class="auth-form" :pageType="pageType" />
    </div>
    <div class="banner">
      <img src="@/assets/images/banners/read_man.png" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.auth-layout {
  @include layout;
  padding-top: 90px;
  display: flex;
  justify-content: space-between;
}

.form-container {
  max-width: 413px;
  width: 100%;

  &__headline {
    padding-bottom: 60px;
  }
}
.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 63px;
}

.banner {
  max-width: 612px;
  max-height: 522px;
  width: 100%;
  height: 100%;
  & > img {
    width: 100%;
    height: 100%;
  }
}
</style>
