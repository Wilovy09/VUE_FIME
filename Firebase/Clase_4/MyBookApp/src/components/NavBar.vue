<script setup>
    import { signOut } from 'firebase/auth';
    import { auth } from '@/firebase';

    const emits = defineEmits(['changePage']);

    async function SignOut(){
        await signOut(auth);
    }
</script>

<template>
    <nav class="flex bg-[#cccccc] justify-between w-[100%] p-3 drop-shadow-xl">
        <h2>MyBookApp</h2>
        <div class="">
            <span class="m-4 hover:text-white" @click="emits('changePage', 'about-us')">Acerda de nosotros</span>
            <span class="m-4 hover:text-white" @click="emits('changePage', 'explore')">Explorar</span>
            <span class="m-4 hover:text-white" @click="emits('changePage', 'reviews')">Reseñas</span>
            <span class="m-4 hover:text-white" @click="emits('changePage', 'profile')">Perfil</span>
            <span class="m-4 hover:text-white" @click="SignOut">Salir</span>
        </div>
    </nav>
</template>