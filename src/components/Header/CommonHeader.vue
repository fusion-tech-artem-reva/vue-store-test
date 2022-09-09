<script setup lang='ts'>
import MainButton from "../UI/buttons/MainButton.vue";

</script>

<template>
  <header>
    <div>
      <img src="@/assets/images/svg/logo.svg" />
      <MainButton 
        type="primary"
        btn-title="ClickMe"
      />
    </div>
  </header>
</template>

<style lang='scss' scoped>
  header {
    max-width: 1280px;
    margin: 0 auto;
  }
</style>