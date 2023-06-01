import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDjs3L5OTblv0dTSZcbVORGgdLLrRCav6s",
    authDomain: "complaintmanagment-6a760.firebaseapp.com",
    projectId: "complaintmanagment-6a760",
    storageBucket: "complaintmanagment-6a760.appspot.com",
    messagingSenderId: "979097121915",
    appId: "1:979097121915:web:b7408cb9cf58164233dede"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
