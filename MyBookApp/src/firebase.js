import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDR14OabTHz81lzfkgDpNt5AqG_MnQldgU",
    authDomain: "mybookapp-2e5e0.firebaseapp.com",
    projectId: "mybookapp-2e5e0",
    storageBucket: "mybookapp-2e5e0.appspot.com",
    messagingSenderId: "507844120558",
    appId: "1:507844120558:web:7d45e7ddb72b048c4208ff"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);