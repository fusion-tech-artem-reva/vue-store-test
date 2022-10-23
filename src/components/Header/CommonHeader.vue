<script setup lang="ts">
import TextInput from "@/components/UI/form/inputs/TextInput.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <header class="header">
    <RouterLink :to="{ name: 'home' }">
      <img src="@/assets/images/svg/logo.svg" />
    </RouterLink>
    <div class="header__search-area">
      <p>Catalog</p>
      <TextInput label="Search" class="search-area__input" />
    </div>
    <nav class="header__navigation">
      <template v-if="userStore.user">
        <RouterLink :to="{ name: 'logout' }" class="navigation__link-item">
          LogOut
        </RouterLink>
      </template>
      <RouterLink v-else :to="{ name: 'auth' }" class="navigation__link-item">
        LogIn
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding-top: 24px;
  align-items: center;

  &__search-area {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    margin: 0px 97px 0 128px;
  }
}

.search-area {
  &__input {
    flex-grow: 1;
    margin-left: 43px;
  }
}

.navigation {
  &__link-item {
    color: var(--dark-blue);
    @include fn-sub-title;
    text-decoration: none;

    &:not(:last-child) {
      margin-right: 12px;
    }
  }
}
</style>
