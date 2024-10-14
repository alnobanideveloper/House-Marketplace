import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCbGjdViwxj0znkLMlmm7WYfehjIAQmtiI",
  authDomain: "house-marketplace-d71f6.firebaseapp.com",
  projectId: "house-marketplace-d71f6",
  storageBucket: "house-marketplace-d71f6.appspot.com",
  messagingSenderId: "1021564385254",
  appId: "1:1021564385254:web:396cc0ff713bc203880827",
  measurementId: "G-1F1R2Y7T1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()