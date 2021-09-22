import { useEffect, useState, useContext, useRef } from "react"
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { GameContext } from '../context/GameContext';

export const ListPlayers = (props) => {
    const { state } = useContext(GameContext)
    const { roomNumber } = props

    const [players, setPlayers] = useState([state.username])
    const isFirstRender = useRef(true)

    const listPlayers = players.map((player) =>
        <li key={player}>{player}</li>
    );

    useEffect(() => {
        const listenForNewPlayers = async () => {
            onSnapshot(doc(db, "rooms", roomNumber), (doc) => {
                if (doc.data() !== undefined) {
                    setPlayers(doc.data().players)
                }
            });
        }
        listenForNewPlayers()
    }, []);

    console.log(players)

    return (
        <div>
            <h3>The code of your room is {roomNumber}</h3>
            <ul>{listPlayers}</ul>
        </div>
    )
}