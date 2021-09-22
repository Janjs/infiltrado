import { useEffect, useState, useContext, useRef } from "react"
import { GameContext } from '../context/GameContext';
import { useHistory } from "react-router-dom"
import { addRoom } from "../api/apiFunctions";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

export const LobbyScreen = () => {
    let history = useHistory()
    const { state } = useContext(GameContext)

    const [roomNumber, setRoomNumber] = useState(null)
    const [players, setPlayers] = useState([state.username])
    const isFirstRender = useRef(true)

    /*const createGame = () => {
        // dispatch({ type: "SET_ROOMNUMBER", payload: roomNumber })
    }*/

    useEffect(() => {
        const getRoomNumber = async () => {
            const roomNumber = await addRoom(state.username)
            setRoomNumber(roomNumber)
        }

        if (state.username === undefined) {
            history.push("/")
        } else {
            getRoomNumber()
        }
    }, [state.username, history])

    useEffect(() => {
        const listenForNewPlayers = async () => {
            onSnapshot(doc(db, "rooms", roomNumber), (doc) => {
                if (doc.data() !== undefined) {
                    setPlayers(doc.data().players)
                }
            });
        }
        // check if its first render
        if (isFirstRender.current) {
            isFirstRender.current = false
            return;
        }
        listenForNewPlayers()
    }, [roomNumber]);

    const listPlayers = players.map((player) =>
        <li key={player}>{player}</li>
    );

    return (
        <div>
            {roomNumber === null ?
                <h3>Loading...</h3>
                :
                <div>
                    <h3>The code of your room is {roomNumber}</h3>
                    <ul>{listPlayers}</ul>
                </div>
            }
        </div>
    )
}