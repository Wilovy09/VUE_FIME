import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Base de datos propia
// const firebaseConfig = {
//     apiKey: "AIzaSyDR14OabTHz81lzfkgDpNt5AqG_MnQldgU",
//     authDomain: "mybookapp-2e5e0.firebaseapp.com",
//     projectId: "mybookapp-2e5e0",
//     storageBucket: "mybookapp-2e5e0.appspot.com",
//     messagingSenderId: "507844120558",
//     appId: "1:507844120558:web:7d45e7ddb72b048c4208ff"
// };

// ------------ Base de datos compartida ------------
const firebaseConfig = {
    apiKey: "AIzaSyAwkY5mphVZ8oRCxHgUAQa5oOdzyIXZEgo",
    authDomain: "devzone-shared-booksapp.firebaseapp.com", 
    projectId: "devzone-shared-booksapp",
    storageBucket: "devzone-shared-booksapp.appspot.com",
    messagingSenderId: "796904826810",
    appId: "1:796904826810:web:6f85fdf56320448f155f83"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app)