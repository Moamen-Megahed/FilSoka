// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArhKDDObJKFT5hohyNoRNesj3gENWjLGg",
    authDomain: "filsoka.firebaseapp.com",
    projectId: "filsoka",
    storageBucket: "filsoka.appspot.com",
    messagingSenderId: "981916593297",
    appId: "1:981916593297:web:2d541efd95da78f2a4a330"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const storage = getStorage();

export const db = getFirestore(app)