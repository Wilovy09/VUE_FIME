<script setup>
    import { ref, onMounted } from "vue";
    import { auth, storage } from "@/firebase.js";
                                 // updateProfile -> displayName y photoURL
    import { onAuthStateChanged, updateProfile } from "firebase/auth";
    import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

    const user = ref(null);
    const name = ref("");
    const profileImageUrl = ref(null);
    const profileImageFile = ref(null);

    function showNewImageOnImgElement(event) {
        profileImageFile.value = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => (profileImageUrl.value = e.target.result);
        reader.readAsDataURL(profileImageFile.value);
    }

    async function uploadFilesToStorage(file){
        const fileRef = storageRef(storage, `profilePictures/${user.value.uid}`);
        await uploadBytes(fileRef, profileImageFile.value);
        
        return await getDownloadURL(fileRef);
    }

    async function saveProfile(){
        try {
            await updateProfile(user.value,{
                displayName: name.value,
                photoURL: profileImageFile ? await uploadFilesToStorage(profileImageFile) : profileImageUrl,
            })
        } catch (error) {
            alert(error.message)
        }
    }

    onMounted(() => {
        onAuthStateChanged(auth, (currentUser) => {
            user.value = currentUser;
            if (currentUser.displayName) name.value = currentUser.displayName;
            if (currentUser.photoURL) profileImageUrl.value = currentUser.photoURL;
        });
    });
</script>

<template>
    <main id="container">
        <img :src="profileImageUrl ?? '/placeholder_profile.png'" alt="Imagen de perfil"/>
        <div id="">
            <p>{{ user?.displayName }}</p>
            <p>{{ user?.email }}</p>
            <input type="file" accept="image/*" @input="showNewImageOnImgElement" />
            <input type="text" v-model="name" placeholder="Añade un nombre a tu perfil"/>
            <button @click="saveProfile">Guardar</button>
        </div>
    </main>
</template>

<style scoped>
    main {
        position: relative;
        max-width: 800px;
        display: flex;
        margin: 50px auto auto;
        padding-inline: 50px;
        
        & > img {
            margin-right: 20px;
            border-radius: 50%;
            width: 200px;
            height: 200px;
            aspect-ratio: 1;
            object-fit: cover;
        }

        & > div {

            & > p {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 20px;
            }

            & > input {
                width: 100%;
                padding: 10px;
                font-size: 16px;
                border: 1px solid #ccc;
                border-radius: 5px;
                margin-bottom: 20px;
            }

            & > button {
                padding: 10px 20px;
                font-size: 16px;
                font-weight: 600;
                border: 0;
                border-radius: 5px;
                background-color: #007bff;
                color: white;
                cursor: pointer;
            }
        }
    }
</style>