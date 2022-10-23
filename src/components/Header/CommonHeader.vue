<script setup lang="ts"></script>

<template>
  <header>
    <div>
      <img src="@/assets/images/svg/logo.svg" />
      <nav>
        <RouterLink :to="{ name: 'auth' }">LogIn</RouterLink>
        <RouterLink :to="{ name: 'logout' }">logout</RouterLink>
      </nav>
    </div>
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
