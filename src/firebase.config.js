// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBClO-0QiPaq8DAmzUuCUJ04gSockffFTA",
  authDomain: "el-shisha-website.firebaseapp.com",
  projectId: "el-shisha-website",
  storageBucket: "el-shisha-website.appspot.com",
  messagingSenderId: "502084283657",
  appId: "1:502084283657:web:d3c86997b7178d1fbef7d8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
