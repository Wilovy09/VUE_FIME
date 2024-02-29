<script setup>
	import { ref } from "vue";

    const emits = defineEmits(['hideLogin']);

	const email = ref();
	const password = ref();

	function login() {
		if (
			email.value === "micorreo@gmail.com" &&
			password.value === "123456"
		) {
            emits('hideLogin');
		} else {
			alert("Credenciales incorrectas");
		}
	}
</script>

<template>
	<!-- LOGIN -->
	<div class="w-[400px] my-[50px] mx-auto bg-[#c6c6c6] block rounded-[30px]">
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
			<div class="flex justify-center mt-4">
				<button type="submit" class="bg-green-500 p-2 rounded-xl">
					Login
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped></style>
