<!-- 
    ✅ Temas a tocar:

    - v-if, v-else, v-else-if   
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
		class="max-w-[400] my-[50px] mx-auto bg-[#c6c6c6] block rounded-[30px]"
	>
		<h1 class="text-center">Login</h1>

		<form @submit.prevent="login()" class="block p-[20px]">
			<div class="">
				<label for="email">Email</label>
				<br />
				<!-- Momentaneos -->
				<input v-model="email" type="text" name="email" id="email" />
			</div>

			<div class="">
				<label for="password">Password</label>
				<br />
				<!-- Momentaneos -->
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
				<button type="submit" class="bg-green-500 p-2 rounded-xl">Login</button>
			</div>
		</form>
	</div>
	<!-- APP -->
	<div v-else class="">
		<nav>
			<h2>MyBookApp</h2>
			<div class="">
				<span @click="pageShow = 'about-us'">Acerda de nosotros</span>
				<span @click="pageShow = 'explore'">Explorar</span>
				<span @click="pageShow = 'reviews'">Reseñas</span>
				<span @click="isLoginShow = true">Salir</span>
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

<style scoped>

	/* NAVBAR */
	nav {
		display: flex;
		background-color: gainsboro;
		align-items: center;
		justify-content: space-between;
		widows: 100%;

		& div > span {
			margin: 0 20px;
		}

		& div > span:hover {
			color: white;
		}
	}
</style>
