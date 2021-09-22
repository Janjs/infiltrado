import { db } from "../firebaseConfig";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";

const checkRoomNumberExists = async (roomNumber) => {
    const roomSnap = await getDoc(doc(db, "rooms", roomNumber));

    if (roomSnap.exists()) {
        console.log("Room data:", roomSnap.data());
    } else {
        console.log("No such room!");
    }

    return roomSnap.exists();
}

export const addRoom = async (username) => {
    do {
        var randomNum = Math.floor(1000 + Math.random() * 9000).toString();
        console.log(randomNum);
    } while (await checkRoomNumberExists(randomNum))

    await setDoc(doc(db, "rooms", randomNum), {
        host: username
    });
}


