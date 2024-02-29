<script setup>
    import { onMounted, ref } from 'vue';
    import Card from '../components/Card.vue';

    const url = 'https://www.dbooks.org/api/recent';
    const books = ref([]); 
    
    
    async function getBooks(){
        const request = await fetch(url)
        // todo lo que esta abajo del await, va esperar a que se complete el await
        const response = await request.json();
        // todo lo que esta abajo del await, va esperar a que se complete el await
        books.value = response.books;
        console.log(response.books);
    }
    onMounted(getBooks);
</script>

<template>
    <h2 class="text-3xl font-bold text-center mt-4">Explorar libros</h2>
    <section class="flex justify-center mt-4">
        <section class="grid gap-4">
            <section v-for="b in books">
                <Card :book="b"/>
            </section>
        </section>
    </section>
</template>