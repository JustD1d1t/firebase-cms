import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA8SydNxFoQTnfJJX-O30mhUyZDsFgAQDI",
    authDomain: "fir-cms-9e796.firebaseapp.com",
    projectId: "fir-cms-9e796",
    storageBucket: "fir-cms-9e796.appspot.com",
    messagingSenderId: "83394514876",
    appId: "1:83394514876:web:d8ac791ebb884236a065b9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
