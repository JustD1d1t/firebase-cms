import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyA8SydNxFoQTnfJJX-O30mhUyZDsFgAQDI",
    authDomain: "fir-cms-9e796.firebaseapp.com",
    projectId: "fir-cms-9e796",
    storageBucket: "fir-cms-9e796.appspot.com",
    messagingSenderId: "83394514876",
    appId: "1:83394514876:web:d8ac791ebb884236a065b9"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
      firebaseFirestore: firestore,
    },
  };
});
