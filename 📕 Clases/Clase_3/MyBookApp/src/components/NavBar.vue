<script setup>
    const emits = defineEmits(['changePage', 'hideLogin']);
</script>

<template>
    <nav class="flex bg-[#ccc] justify-between w-[100%] p-3">
        <h2>MyBookApp</h2>
        <div class="">
            <span class="m-4 hover:text-white" @click="emits('changePage', 'about-us')">Acerda de nosotros</span>
            <span class="m-4 hover:text-white" @click="emits('changePage', 'explore')">Explorar</span>
            <span class="m-4 hover:text-white" @click="emits('changePage', 'reviews')">Reseñas</span>
            <span class="m-4 hover:text-white" @click="emits('hideLogin')">Salir</span>
        </div>
    </nav>
</template>

<style scoped>
</style>