<script setup>
    defineProps(["book"]);
</script>

<template>
    <section class="lg:flex lg:w-[650px] lg:max-h-[20rem] bg-white duration-150 hover:scale-[102%] hover:shadow-md
                    w-[300px] rounded-md cursor-pointer">
        <div class="min-w-[40%]">
            <img class="h-full rounded-t-md lg:rounded-none" :src="book.image" :alt="book.title">
        </div>
        <div class="p-4">
            <h3 class="font-bold text-gray-800 text-2xl">{{ book.title }}</h3>
            <span v-if="book.subtitle">
                <p class="font-bold text-gray-600 text-xl">{{ book.subtitle }}</p>
            </span>
            <div class="">
                <p class="font-bold text-gray-500">{{ book.authors }}</p>
            </div>
        </div>
    </section>
</template> 