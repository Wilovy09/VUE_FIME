<!-- 
    ✅ Temas a tocar:
    - Componentes                  
		- Props                    .
	- v-for                        ✅
	- onMounted (ciclos de vida)   .
-->
<script setup>
	import { ref } from "vue";
	import Navbar from "./components/NavBar.vue";
	import LoginPage from "./pages/LoginPage.vue";
	import AboutUs from "./pages/AboutUs.vue";
	import ExplorePage from "./pages/ExplorePage.vue";
	import ReviewsPage from "./pages/ReviewsPage.vue";

	const isLoginShow = ref(true);
	const pageShow = ref("about-us");

	function changePage(page){
		pageShow.value = page;
	}
</script>

<template>
	<LoginPage @hide-login="isLoginShow=false" v-if="isLoginShow == true"/>
	<div v-else class="">
		<Navbar @change-page="changePage" @hide-login="isLoginShow = true"/>

		<AboutUs v-if="pageShow == 'about-us'"/>
		<ExplorePage v-else-if="pageShow == 'explore'"/>
		<ReviewsPage v-else-if="pageShow == 'reviews'"/>
	</div>
</template>