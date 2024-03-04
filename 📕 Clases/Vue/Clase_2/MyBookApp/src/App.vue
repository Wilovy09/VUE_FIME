<!-- 
    ✅ Temas a tocar:

    - v-if, v-else, v-else-if   ✅
    - v-model                   ✅
	- v-for                     
	- @submit, @submit.prevent  ✅
-->
<script setup>
	import { ref } from "vue";

	const email = ref();
	const password = ref();
	console.log(email.value, password.value);

	const isLoginShow = ref(true);
	const pageShow = ref("about-us");

	function login() {
		// console.log(email.value, password.value);

		// Simulando backend
		if (
			email.value === "micorreo@gmail.com" &&
			password.value === "123456"
		) {
			isLoginShow.value = false;
			console.log("Login exitoso");
		} else {
			alert("Credenciales incorrectas");
		}
	}
</script>

<template>
	<!-- LOGIN -->
	<div
		v-if="isLoginShow === true"
		class="w-[400px] my-[50px] mx-auto bg-[#c6c6c6] block rounded-[30px]"
	>
		<h1 class="text-center">Login</h1>

		<form @submit.prevent="login()" class="block p-[20px]">
			<div class="grid justify-center">
				<label for="email">Email</label>
				<input v-model="email" type="text" name="email" id="email" />
			</div>

			<div class="grid justify-center">
				<label for="password">Password</label>
				<input
					v-model="password"
					type="text"
					name="password"
					id="password"
				/>
			</div>
			<br />
			<!-- Momentaneos -->
			<div class="flex justify-center">
				<button type="submit" class="bg-green-500 p-2 rounded-xl">
					Login
				</button>
			</div>
		</form>
	</div>
	<!-- APP -->
	<div v-else class="">
		
		<nav class="flex bg-[#ccc] justify-between w-[100%] p-3">
			<h2>MyBookApp</h2>
			<div class="">
				<span
					class="m-4 hover:text-white"
					@click="pageShow = 'about-us'"
					>Acerda de nosotros</span
				>
				<span class="m-4 hover:text-white" @click="pageShow = 'explore'"
					>Explorar</span
				>
				<span class="m-4 hover:text-white" @click="pageShow = 'reviews'"
					>Reseñas</span
				>
				<span class="m-4 hover:text-white" @click="isLoginShow = true"
					>Salir</span
				>
			</div>
		</nav>
		<!-- Acerca de nosotros  -->
		<section v-if="pageShow === 'about-us'">
			<h2>Acerca de nosotros</h2>
		</section>
		<!-- Explorar -->
		<section v-else-if="pageShow === 'explore'">
			<h2>Explorar</h2>
		</section>
		<!-- Reseñas -->
		<section v-else-if="pageShow === 'reviews'">
			<h2>Reseñas</h2>
		</section>
	</div>
</template>

<style scoped></style>
