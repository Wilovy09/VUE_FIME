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
	<div class="flex justify-center items-center h-screen mx-auto">

		<div class="bg-[#e0e0e0] w-[400px] rounded-[30px] p-4">
			<img src="/book.svg" alt="Logo" class="w-[40%] m-auto">
			<h1 class="text-center text-3xl font-bold">My Book APP</h1>
			<h2 class="mt-4 text-center text-xl font-bold">Login</h2>
			
			<form @submit.prevent="login()" class="block p-[20px]">
				<div class="grid">
					<label for="email" class="text-xl font-semibold">Email</label>
					<input v-model="email" type="text" name="email" id="email" class="rounded-xl p-2 mt-2" placeholder="your@email.com" required/>
				</div>

				<div class="grid mt-2">
					<label for="password" class="text-xl font-semibold">Password</label>
					<input v-model="password" type="password" name="password" id="password" class="rounded-xl p-2 mt-2" placeholder="YourPassword0." required/>
				</div>
				<div class="flex justify-center mt-4">
					<button type="submit" class="bg-[#7abee6] text-white hover:text-black py-2 min-w-[100%] rounded-xl">
						Login
					</button>
				</div>
			</form>
		</div>

	</div>
</template>