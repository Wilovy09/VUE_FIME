<!-- 
    Temas a tocar:

    - Reactividad            ✅
    - Delarative Rendering   ✅
    - Single File Components ✅
    - @onclick -> @click     ✅
    - v-bind                 ✅
    - v-if                   ✅
    - v-else                 ✅
    - Operador ternario      ✅
-->
<script setup>
	// Hace reactivo el valor
	import { ref } from "vue";

	// Declara una variable reactiva
	const count = ref(0);

	// Incrementa el valor de count
	function increment() {
		count.value++;
	}

	// Decrementa el valor de count
	function decrement() {
		count.value--;
	}

</script>

<template>
	<div class="">
		<!-- v-bind -> : , vas aplicar la clase red solo si count es mayor a 10 -->
		<h3 :class="{ red: count > 10, green: count < 0 }">
			El contador actual es: {{ count }}
		</h3>
		<button type="button" @click="increment()">Incrementar</button>
		&nbsp;
		<button type="button" @click="decrement()">Decrementar</button>

		<!-- v-if, necesita condición-->
		<h3 v-if="count >= 20">Hola desde la cima!</h3>
        <!-- v-else, no necesita condición -->
        <h3 v-else>Aun no lo logras</h3>

        <!-- Operador ternario -->
        <h3>{{ count >= 20 ? "Lo lograste" : "Aun no lo logras" }}</h3>
	</div>
</template>

<style scoped>
	.red {
		color: red;
	}
	.green {
		color: green;
	}
</style>
