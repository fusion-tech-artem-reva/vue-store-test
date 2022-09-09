<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CommonHeader from './components/Header/CommonHeader.vue'
</script>

<template>
  <CommonHeader />
  <header>

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink to="/auth">LogIn/SignUp</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
