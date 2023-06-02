import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgqSHBnCFUo3Eiti441W-zekJYHSpmuSQ",
    authDomain: "complaints-91649.firebaseapp.com",
    projectId: "complaints-91649",
    storageBucket: "complaints-91649.appspot.com",
    messagingSenderId: "654130548302",
    appId: "1:654130548302:web:78df1da6ed594f93e9bd1f"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
