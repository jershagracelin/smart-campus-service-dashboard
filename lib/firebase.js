import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD_MCkU4vdp1wY-v5xvawhma_QiEtX6OBM",
  authDomain: "campus-659bc.firebaseapp.com",
  projectId: "campus-659bc",
  storageBucket: "campus-659bc.appspot.com",
  messagingSenderId: "517608889658",
  appId: "1:517608889658:web:2952c0efe695129d6f8403",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Firestore database
export const db = getFirestore(app)
