// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAZN_Fh1z6grn62yGUT6fCGbexb0itkVnU",
  authDomain: "decentrawallet-66c0d.firebaseapp.com",
  projectId: "decentrawallet-66c0d",
  storageBucket: "decentrawallet-66c0d.appspot.com",
  messagingSenderId: "135706137745",
  appId: "1:135706137745:web:1ba4be0210daffbcbfdb30",
  measurementId: "G-K1RTJ6KP9H",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
