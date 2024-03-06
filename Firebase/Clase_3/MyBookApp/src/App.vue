<script setup>
	import { onMounted, ref, computed } from "vue";
	import { onAuthStateChanged } from "firebase/auth";
	import { auth } from "@/firebase.js";

	import Navbar from "./components/NavBar.vue";
	import LoginPage from "./pages/LoginPage.vue";
	import AboutUs from "./pages/AboutUs.vue";
	import ExplorePage from "./pages/ExplorePage.vue";
	import ReviewsPage from "./pages/ReviewsPage.vue";

	const isUserAuthenticated = computed(()=> user.value != null)
	const pageShow = ref("about-us");
	const user = ref(null);

	function changePage(page){
		pageShow.value = page;
	}

	onMounted(() => {
		onAuthStateChanged(auth,(currentUser) => {
			if (currentUser != null) {
				user.value = currentUser;
			} else {
				user.value = null;
			}
			console.log(user.value);
		})
	});
</script>

<template>
	<LoginPage @hide-login="isUserAuthenticated = false" v-if="isUserAuthenticated === false"/>
	<div v-else class="">
		<Navbar @change-page="changePage" @hide-login="isUserAuthenticated = true"/>

		<AboutUs v-if="pageShow == 'about-us'"/>
		<ExplorePage v-else-if="pageShow == 'explore'"/>
		<ReviewsPage v-else-if="pageShow == 'reviews'"/>
	</div>
</template>