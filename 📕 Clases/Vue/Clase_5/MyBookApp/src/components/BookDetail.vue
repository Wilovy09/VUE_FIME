<script setup>
    import { onMounted, ref } from "vue";
    const emits = defineEmits(['hideDetails'])
    const props = defineProps(["selectedBookId"]);

    const bookDetails = ref([])

    const url = `https://www.dbooks.org/api/book/` + props.selectedBookId;

    async function getBook(){
        const request = await fetch(url);
        const response = await request.json();
        bookDetails.value = response;
    }
    onMounted(getBook)
</script>

<template>
    <section>
        <h2 class="text-3xl font-bold text-center mt-4"> Detalles de libro </h2>
        <div class="flex justify-center rounded-xl">
            <div class="">
                <img class="rounded-l-xl" :src="bookDetails?.image" :alt="bookDetails?.title">
            </div>
            <div class="p-4">
                <button type="button" @click="emits('hideDetails')" class="p-2 bg-gray-500 rounded-xl">Atras</button>
                <p class="font-bold text-gray-800 text-2xl">{{ bookDetails?.title }}</p>
                <p class="font-bold text-gray-800 text-xl">{{ bookDetails?.subtitle }}</p>
                <p class="font-bold text-gray-500">{{ bookDetails?.authors }}</p>
                <p class="font-bold text-black">Paginas: {{ bookDetails?.pages }}</p>
                <p class="font-bold text-black">Año de lanzamiento: {{ bookDetails?.year }}</p>
                <p class="font-bold text-black">Editorial: {{ bookDetails?.publisher }}</p>
                <div class="mt-[20%]">
                    <button type="button" class="w-full bg-orange-500 p-2 rounded-xl mb-4">Crear Reseña</button>
                    <a class="bg-green-500 p-2 rounded-xl" :href="bookDetails?.download">Descargar</a>
                </div>
            </div>
        </div>
        <div class="flex justify-center rounded-xl">
            <p class="font-bold text-black w-[60%] mt-4">{{ bookDetails?.description }}</p>
        </div>
    </section>
</template>

<style scoped>
</style>