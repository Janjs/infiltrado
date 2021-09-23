import { useEffect, useState, useContext } from "react"
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { GameContext } from '../context/GameContext';
import { Button } from "@mui/material";
import { startGame } from "../api/apiFunctions";
import { Redirect } from "react-router";

export const ListPlayers = (props) => {
    const { state, dispatch } = useContext(GameContext)
    const { roomNumber } = props

    const [players, setPlayers] = useState([state.username])
    const [isHost, setIsHost] = useState(false)
    const [status, setStatus] = useState("LOBBY")

    const listPlayers = players.map((player) =>
        <li key={player}>{player}</li>
    );

    useEffect(() => {
        const listenForNewPlayers = async () => {
            onSnapshot(doc(db, "rooms", roomNumber), (doc) => {
                if (doc.data() !== undefined) {
                    setPlayers(doc.data().players)
                    if (state.username === doc.data().host) {
                        setIsHost(true)
                        dispatch({ type: "SET_ISHOST", payload: true })
                    }
                    setStatus(doc.data().status)
                }
            });
        }
        listenForNewPlayers()
    }, [dispatch, roomNumber, state.username]);

    const handleStartGamePressed = async () => {
        dispatch({ type: "SET_ROOMNUMBER", payload: roomNumber })
        dispatch({ type: "UPDATE_PLAYERS", payload: players })
        await startGame(roomNumber)
        setStatus("STARTED")
    }

    return (
        <div>
            {status !== "STARTED" ?
                <div>
                    <h3>The code of your room is {roomNumber}</h3>
                    <ul>{listPlayers}</ul>
                    {isHost && <Button variant="outlined" onClick={handleStartGamePressed}>Start Game</Button>}
                </div>
                :
                <Redirect to="/game" />
            }
        </div>
    )
}