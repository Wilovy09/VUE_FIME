<script setup>
defineProps(["book"]);
</script>

<template>
    <section class="flex min-w-[700px] rounded-xl bg-[#949494]">
        <div class="">
            <img class="rounded-l-xl" :src="book.image" alt="IMG">
        </div>
        <div class="ml-4">
            <h3 class="text-xl font-semibold">Titulo</h3>
            <p>{{ book.title }}</p>
            <span v-if="book.subtitle">
                <h3 class="text-xl font-semibold">Subtitulo</h3>
                <p>{{ book.subtitle }}</p>
            </span>
            <h3 class="text-xl font-semibold">Autores</h3>
            <p>{{ book.authors }}</p>
        </div>
    </section>
</template> 