// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//import for firestore
import {getFirestore} from 'firebase/firestore'

//import for authentication
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDipPxzlz6pBH9SfZPYe9h0loi1xdV4nnU",
  authDomain: "blog-25095.firebaseapp.com",
  projectId: "blog-25095",
  storageBucket: "blog-25095.appspot.com",
  messagingSenderId: "637579973774",
  appId: "1:637579973774:web:424457e874f57e2bfae5df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//set up db hook and export it
export const db = getFirestore(app)

//activate authentication
export const auth = getAuth(app)