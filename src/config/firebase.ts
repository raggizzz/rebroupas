//// Importar as funções necessárias dos SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Adicionar SDKs para produtos Firebase que você deseja usar
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuração do Firebase da sua aplicação web
const firebaseConfig = {
  apiKey: "AIzaSyC0HimAyD47ttNnn_uQGuY69P1lS2ZlNOs",
  authDomain: "rebroupas-94244.firebaseapp.com",
  projectId: "rebroupas-94244",
  storageBucket: "rebroupas-94244.firebasestorage.app",
  messagingSenderId: "498922656266",
  appId: "1:498922656266:web:3215b4059e079e076845f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;