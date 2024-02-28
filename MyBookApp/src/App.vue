<!-- 
    ✅ Temas a tocar:

    - Componentes                  ✅
		- Props                    .
		- Emits                    ✅
	- v-for                        .
-->
<script setup>
	import { ref } from "vue";
	import LoginPage from "./pages/LoginPage.vue";
	import Navbar from "./components/NavBar.vue";

	const isLoginShow = ref(true);
	const pageShow = ref("about-us");

	function changePage(page){
		pageShow.value = page;
	}
</script>

<template>
	<LoginPage @hide-login="isLoginShow=false" v-if="isLoginShow == true"/>
	<!-- APP -->
	<div v-else class="">
		<Navbar @change-page="changePage" @hide-login="isLoginShow = true"/>

		<section v-if="pageShow == 'about-us'" class="max-w-[700px] m-auto">
			<img class="min-w-[100%]" src="../public/libros.jpg" alt="IMG_Libros"/>
			<h2 class="font-bold text-2xl text-center">Acerca de nosotros</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
				aliquam molestiae nulla inventore minima dignissimos eius vitae.
				Nulla cum eaque commodi animi, assumenda a perferendis iste
				architecto, sequi quo molestiae aut! Perferendis eveniet tenetur
				porro error autem qui in, sint ducimus? Maxime ipsam ipsum est
				repellendus harum, nam quae possimus voluptatem vero, temporibus
				iure fuga autem. Maiores molestias porro excepturi praesentium
				nihil repellat similique voluptatem exercitationem! Deleniti
				itaque, quo explicabo deserunt repudiandae ipsam hic tempora
				quibusdam neque beatae eligendi non animi est facere recusandae
				corporis fugit reprehenderit. Maxime nesciunt repudiandae
				mollitia ut, minus illo suscipit voluptates consequuntur
				repellendus, nulla possimus dolorem magnam. Quod earum, amet,
				placeat dolor voluptatibus alias vero iusto porro explicabo rem
				quos eum? Fugiat esse blanditiis animi doloribus ratione quia
				commodi dolorem asperiores sapiente optio adipisci distinctio
				possimus, nam explicabo vitae et quos ducimus? Odit earum quasi
				iusto? Soluta quidem iusto, vel tempore aut maiores accusantium
				magnam.
			</p>
		</section>
		<!-- Explorar -->
		<section v-else-if="pageShow == 'explore'">
			<h2>Explorar</h2>
		</section>
		<!-- Reseñas -->
		<section v-else-if="pageShow == 'reviews'">
			<h2>Reseñas</h2>
		</section>
	</div>
</template>

<style scoped></style>
