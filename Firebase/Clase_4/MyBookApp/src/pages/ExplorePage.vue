<script setup>
    import { onMounted, ref } from 'vue';
    import Card from '../components/Card.vue';
    import BookDetail from '@/components/BookDetail.vue';

    const url = 'https://www.dbooks.org/api/recent';
    const books = ref([]); 
    
    const selectedBookId = ref();
    
    async function getBooks(){
        const request = await fetch(url)
        const response = await request.json();
        books.value = response.books.filter((book)=> !book.id.includes("X"));
    }
    onMounted(getBooks);
</script>

<template>
    <section v-if="!selectedBookId">

        <h2 class="text-3xl font-bold text-center mt-4">Explorar libros</h2>
        <section class="flex justify-center mt-4">
            <section class="sm:columns-2 md:columns-2 lg:columns-1 xl:columns-2 gap-4">

                <section v-for="b in books" class="mt-4 first-of-type:mt-0">
                    <Card :book="b" @click="selectedBookId = b.id; console.log(selectedBookId)"/>
                </section>
            
            </section>
        </section>

    </section>

    <BookDetail v-else :selected-book-id="selectedBookId" @hide-details="selectedBookId = undefined"/>

</template>