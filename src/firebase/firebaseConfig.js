import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD7cC1bFPOkhVQvL7vk5OrEy9oLvpfrkso",
    authDomain: "images-quiz.firebaseapp.com",
    projectId: "images-quiz",
    storageBucket: "images-quiz.appspot.com",
    messagingSenderId: "309668330841",
    appId: "1:309668330841:web:cb0f1c7e096e42e0c16048",
    measurementId: "G-Z3MPSQSCTV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
