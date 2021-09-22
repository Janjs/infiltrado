import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBOmtNC0RM7AbGGcz5QK9FuKzb4GhU1RMs',
    authDomain: 'infiltrado-app.firebaseapp.com',
    projectId: 'infiltrado-app'
});

console.log("Firebase connected " + JSON.stringify(firebaseApp))

export const db = getFirestore();