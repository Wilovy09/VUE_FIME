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
	<div class="bg flex justify-center items-center h-screen mx-auto text-white">
		<div class="card-login bg-[#e0e0e0] w-[400px] rounded-[30px] p-4">
			<img src="/book.svg" alt="Logo" class="w-[40%] m-auto">
			<h1 class="text-center text-3xl font-bold">My Book APP</h1>
			<h2 class="mt-4 text-center text-xl font-bold">Login</h2>
			
			<form @submit.prevent="login()" class="block p-[20px]">
				<div class="grid">
					<label for="email" class="text-xl font-semibold">Email</label>
					<input v-model="email" type="text" name="email" id="email" class="text-black rounded-xl p-2 mt-2 focus:ring-violet-300" placeholder="your@email.com" required/>
				</div>

				<div class="grid mt-2">
					<label for="password" class="text-xl font-semibold">Password</label>
					<input v-model="password" type="password" name="password" id="password" class="text-black rounded-xl p-2 mt-2" placeholder="YourPassword0." required/>
				</div>
				<div class="flex justify-center mt-4">
					<button type="submit" class="login-btn text-white hover:text-black py-2 min-w-[100%] rounded-xl">
						Login
					</button>
				</div>
			</form>
		</div>

	</div>
</template>

<style scoped>
	.bg{
		background-image: linear-gradient(to bottom right, #9664bb 0%, #6f37a4 20%, #95289b 40%, #fe7098 60%, #f973d2 80%);
		background-size: 200% 200%;
		animation: movimiento 5s linear infinite alternate;
	}

	@keyframes movimiento{
		from{
			background-position: 0 0;
		}
		to{
			background-position: 100% 100%;
		}
	}

	.card-login{
		background: rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(7.2px);
		-webkit-backdrop-filter: blur(7.2px);
	}

	.login-btn{
		border: 2px solid rgba(255, 255, 255, 0.50);
		transition: all 0.3s ease-in-out;
		
		&:hover{
			font-weight: bold;
			color: #95289b;
			background-color: rgba(255, 255, 255, 0.50);
		}
	}

/* 

#7abee6
#6bb6df
#77a3d7
#5d97cb
#5199d1

#9664bb
#6f37a4
#95289b
#fe7098
#f973d2

*/
</style>