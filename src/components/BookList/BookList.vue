<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "@/api/index";

import type { BookType } from "@/types/book.model";
import BookItem from "./BookItem.vue";

const booksList = ref<BookType[]>([]);

onMounted(() => {
  (async () => {
    const resp = await axios.get<{ data: { books: BookType[] } }>("/books");
    booksList.value = resp.data.data.books;
  })();
});
</script>

<template>
  <template v-if="booksList.length">
    <BookItem v-for="book in booksList" :key="book.id" :book="book" />
  </template>
</template>

<style lang="scss" scoped></style>
