<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import CommonHeader from "./components/Header/CommonHeader.vue";
import { useUserStore } from "./stores/user";
const userStore = useUserStore();
</script>

<template>
  <template v-if="userStore.isInitialised">
    <CommonHeader />
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/profile">Profile</RouterLink>
          <RouterLink to="/auth">LogIn/SignUp</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </template>
  <h1 v-else>Loading...</h1>
</template>

<style scoped></style>
