
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAuX9kO6nnfE2WkUkMPHsNBG5OXho54HS4",
    authDomain: "rec-food.firebaseapp.com",
    projectId: "rec-food",
    storageBucket: "rec-food.appspot.com",
    messagingSenderId: "831306915572",
    appId: "1:831306915572:web:85eb5b0f754a2f589c08a1"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}