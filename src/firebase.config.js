import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyCMwuqw17-0a-rn4vu0a38C0Nx67-ppEM0",
	authDomain: "my-recipeeee.firebaseapp.com",
	projectId: "my-recipeeee",
	storageBucket: "my-recipeeee.appspot.com",
	messagingSenderId: "215708331886",
	appId: "1:215708331886:web:1a26840fba20d5f3425b7f",
	measurementId: "G-W9ZGC35E79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
