import { db } from "../firebaseConfig";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const checkRoomNumberExists = async (roomNumber) => {
    const roomSnap = await getDoc(doc(db, "rooms", roomNumber));
    return roomSnap.exists();
}

export const addRoom = async (username) => {
    do {
        var randomNum = Math.floor(1000 + Math.random() * 9000).toString();
    } while (await checkRoomNumberExists(randomNum))

    await setDoc(doc(db, "rooms", randomNum), {
        host: username,
        players: [username],
        status: "LOBBY",
        word: "",
        infiltrat: ""
    });

    return randomNum
}

export const joinRoom = async (roomNumber, username) => {
    const roomRef = doc(db, "rooms", roomNumber);

    await updateDoc(roomRef, {
        players: arrayUnion(username)
    });
}

export const startGame = async (roomNumber) => {
    const roomRef = doc(db, "rooms", roomNumber);

    await updateDoc(roomRef, {
        status: "STARTED"
    });
}

export const addWord = async (roomNumber, wordEntered, infiltrat) => {
    const roomRef = doc(db, "rooms", roomNumber);

    await updateDoc(roomRef, {
        word: wordEntered,
        infiltrat: infiltrat
    });
}

export const restartGame = async (roomNumber) => {
    const roomRef = doc(db, "rooms", roomNumber);

    await updateDoc(roomRef, {
        status: "LOBBY",
        infiltrat: "",
        word: ""
    });
}



