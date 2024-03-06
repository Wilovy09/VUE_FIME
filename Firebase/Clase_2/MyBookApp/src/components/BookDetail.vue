<script setup>
    import { onMounted, ref } from "vue";
    import { firestore, auth } from "@/firebase";
    import { collection, addDoc, getDocs } from "firebase/firestore";
    import { onAuthStateChanged } from "firebase/auth";

    const emits = defineEmits(['hideDetails'])
    const props = defineProps(["selectedBookId"]);

    const bookDetails = ref([])

    const url = `https://www.dbooks.org/api/book/` + props.selectedBookId;

    async function getBook(){
        const request = await fetch(url);
        const response = await request.json();
        bookDetails.value = response;
    }

    const reviews = ref([]);
    const newReview = ref("");
    const user = ref(null);

    async function getReviews() {
        try {
            const reviewsRef = collection(firestore, "reviews");
            const docsSnapshot = await getDocs(reviewsRef)
            reviews.value = docsSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            // --------------------------------------
            // const comentarios = reviews.value.map((review) => review.bookId)
            // const noComentarios = ref([])
            // for (let i = 0; i < comentarios.length; i++) {
            //     if (comentarios[i] === props.selectedBookId) {
            //         reviews.value = reviews.value.filter((review) => review.bookId === props.selectedBookId)
            //     } else {
                    
            //     }
            // }
            // --------------------------------------
        } catch (e) {
            console.log("Error getting documents: ", e)
        }
    }

    async function submitReview() {
        try{
            const reviewsRef = collection(firestore, "reviews");
            await addDoc(reviewsRef, {
                bookId: props.selectedBookId,
                content: newReview.value,
                userId: user.value.uid,
                userEmail: user.value.email,
            })
            getReviews();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }


    onMounted(()=>{
        getBook();
        getReviews();
        onAuthStateChanged(auth,(currentUser) => {
            user.value = currentUser;
        })
    })
</script>

<template>
    <section>
        <h2 class="text-3xl font-bold text-center mt-4"> Detalles de libro </h2>
        <div class="flex justify-center rounded-xl">
            <div>
                <img class="rounded-l-xl" :src="bookDetails?.image" :alt="bookDetails?.title">
            </div>
            <div class="p-4">
                <button type="button" @click="emits('hideDetails')" class="p-2 bg-gray-500 rounded-xl">Atras</button>
                <p class="font-bold text-gray-800 text-2xl">{{ bookDetails?.title }}</p>
                <p class="font-bold text-gray-800 text-xl">{{ bookDetails?.subtitle }}</p>
                <p class="font-bold text-gray-500">{{ bookDetails?.authors }}</p>
                <p class="font-bold text-black">Paginas: {{ bookDetails?.pages }}</p>
                <p class="font-bold text-black">Año de lanzamiento: {{ bookDetails?.year }}</p>
                <p class="font-bold text-black">Editorial: {{ bookDetails?.publisher }}</p>
                <div class="mt-[20%]">
                    <button type="button" class="w-full bg-orange-500 p-2 rounded-xl mb-4">Crear Reseña</button>
                    <a class="bg-green-500 p-2 rounded-xl" :href="bookDetails?.download">Descargar</a>
                </div>
            </div>
        </div>
        <div class="flex justify-center rounded-xl">
            <p class="font-bold text-black w-[60%] mt-4">{{ bookDetails?.description }}</p>
        </div>
        
        <div class="">
            <h2 class="text-2xl text-center font-bold mb-4">Reseñas</h2>

            <div v-for="review in reviews" :key="review.id" v-show="reviews.length" class="review">
                <div class="grid bg-white rounded-xl w-[500px] m-auto p-2 mb-4">
                    <p class="font-bold text-md">{{ review.userEmail }}</p>
                    <p class="">{{ review.content }}</p>
                </div>
            </div>
            <div v-show="!reviews.length" class="text-2xl text-center">No hay reseñas</div>
            
            <form @submit.prevent="submitReview" class="grid w-[700px] m-auto">
                <textarea :placeholder="`Escribe una reseña para ${bookDetails?.title}`"
                v-model="newReview" class="rounded-xl mt-4 p-2" rows="10"></textarea>
                <button type="submit" class="bg-green-500 rounded-xl w-[200px] m-auto p-2 my-4">Enviar</button>
            </form>
        </div>
    </section>
</template>

<style scoped>
</style>