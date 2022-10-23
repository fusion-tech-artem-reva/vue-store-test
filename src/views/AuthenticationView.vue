<script setup lang="ts">
import SignInForm from "../components/AuthForms/AuthForm.vue";

</script>

<template>
  <section>Auth</section>
  <SignInForm />
</template>

<style lang="scss" scoped>
.auth-form {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  row-gap: 63px;
}
</style>
