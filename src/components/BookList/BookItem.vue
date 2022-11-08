<script setup lang="ts">
import MainButton from "@/components/UI/buttons/MainButton.vue";
import type { BookType } from "@/types/book.model";
import { computed } from '@vue/reactivity';

const props = defineProps<{
  book: BookType;
}>();

const bookPrice = computed(() => {
  return `$${props.book.price * 100 / 100} USD`;
});

const bookRating = computed(() => {
    return props.book?.ratings?.reduce((acc, curr) => acc + curr, 3);
})
</script>

<template>
  <div>
    <div>
      <img :src="book.cover" />
    </div>
    <div>
      <h3>{{ book.name }}</h3>
      <p>
        <span v-for="(author, idx) in book.authors" :key="idx">
          {{ author.name }}
        </span>
      </p>
      <q-rating
        v-model="bookRating"
        size="18px"
        color="#BFCC94"
        readonly
      />
    </div>
    <MainButton :btnTitle="bookPrice" type="primary" />
  </div>
</template>

<style lang="scss" scoped></style>
