import { db } from "../firebaseConfig";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export const addRoom = async (username) => {
    var randomNum = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(randomNum);

    await setDoc(doc(db, "rooms", randomNum), {
        host: username
    });
}