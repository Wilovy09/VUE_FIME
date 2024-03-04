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
	<div class="flex justify-center items-center h-screen mx-auto">
		<div class="bg-[#727272] w-[400px] rounded-[30px] p-4">
			<h1 class="text-center text-3xl font-bold">Login</h1>

			<form @submit.prevent="login()" class="block p-[20px]">
				<div class="grid">
					<label for="email" class="text-xl font-semibold">Email</label>
					<input v-model="email" type="text" name="email" id="email" class="rounded-xl p-2 mt-2" placeholder="your@email.com" required/>
				</div>

				<div class="grid mt-2">
					<label for="password" class="text-xl font-semibold">Password</label>
					<input v-model="password" type="text" name="password" id="password" class="rounded-xl p-2 mt-2" placeholder="YourPassword0." required/>
				</div>
				<div class="flex justify-center mt-4">
					<button type="submit" class="bg-green-500 text-white hover:text-black py-2 min-w-[100%] rounded-xl">
						Login
					</button>
				</div>
			</form>
		</div>
	</div>
</template>