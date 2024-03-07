<script setup>
    import { onMounted, ref } from "vue";
    import { auth, firestore, storage } from "@/firebase";
    import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
    import { onAuthStateChanged } from "firebase/auth";
    import { ref as storageRef, getDownloadURL } from "firebase/storage";

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
            const reviewsQuery = query(
                collection(firestore, "reviews"),
                where("bookId", "==", props.selectedBookId),
                orderBy("createdAt", "asc"),
            );
            const docsSnapshot = await getDocs(reviewsQuery)
            reviews.value = docsSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            sideLoadImages();
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
                createdAt: serverTimestamp(),
            })
            getReviews();
            newReview.value = "";
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    async function deleteReview(id){
        if (!confirm("¿Seguro que deseas borrar la reseña?")){
            return;
        }
        try {
            const reviewRef = doc(firestore, "reviews", id);
            await deleteDoc(reviewRef);
            getReviews();
        } catch (e){
            alert(`Error al borrar la reseña: ${e}`);
        }
    }

    async function editReview(id, content){
        const newContent = prompt("Edita la reseña", content);
        if (!newContent){
            alert("La reseña no puede estar vacia");
            return;
        }
        try{
            const reviewRef = doc(firestore, "reviews", id);
            await updateDoc(reviewRef,{
                content: newContent,
                updatedAt: serverTimestamp(),
            })
            await getReviews();
        } catch(e){
            console.log("Error updating document: ", e)
        }
    }

    function sideLoadImages(){
        reviews.value.forEach(async(review)=> {
            const imgRef = storageRef(storage, `profilePictures/${review.userId}`);
            review.userProfilePicture = await getDownloadURL(imgRef);
        })
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
                    
                    <div class="flex">
                        <img :src="review.userProfilePicture ?? '/placeholder_profile.png'" alt="PROFILE" class="rounded-full w-16 h-16">

                        <p class="font-bold text-md">{{ review.userEmail }} | {{ review.createdAt.toDate().toLocaleDateString() }} <span v-if="review.updatedAt">- Editado</span></p>
                    </div>
                    
                    <p class="">{{ review.content }}</p>
                    <div v-if="user.uid == review.userId" class="flex">
                        <button @click="deleteReview(review.id)" class="bg-red-500 rounded-xl p-1 w-[200px] m-auto">Eliminar</button>
                        <button @click="editReview(review.id, review.content)" class="bg-orange-500 rounded-xl p-1 w-[200px] m-auto">Editar</button>
                    </div>
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