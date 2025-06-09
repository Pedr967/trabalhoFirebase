// src/services/credenciaisFirebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_NDYj--z9He1Fl45wxwlWwS8KMzy0UoU",
  authDomain: "apppiunipam-pedro-4e25f.firebaseapp.com",
  projectId: "apppiunipam-pedro-4e25f",
  storageBucket: "apppiunipam-pedro-4e25f.firebasestorage.app",
  messagingSenderId: "815151581736",
  appId: "1:815151581736:web:1e7ae2df95d0f90d4a831d",
};

// Inicializa o App
const appFirebase = initializeApp(firebaseConfig);

// **NOVO**: inicializa e exporta o Firestore
export const db = getFirestore(appFirebase);

// Mantém export default do App (útil caso queira)
export default appFirebase;
