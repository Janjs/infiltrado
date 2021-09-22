import { useEffect, useState, useContext } from "react"
import { GameContext } from '../context/GameContext';
import { useHistory } from "react-router-dom"
import { addRoom } from "../api/apiFunctions";

export const LobbyScreen = () => {
    let history = useHistory()
    const { state, dispatch } = useContext(GameContext)

    const [players, setPlayers] = useState([state.username])

    const getRoomNumber = () => {
        const roomNumber = addRoom(state.username)

        return roomNumber
    }

    const listenForNewPlayers = () => {

    }

    useEffect(() => {
        if (state.username === undefined) {
            history.push("/")
        } else {
            const roomNumber = getRoomNumber()
            dispatch({ type: "SET_ROOMNUMBER", payload: roomNumber })
            listenForNewPlayers()
        }
    }, [])

    const { roomNumber } = state

    const listPlayers = players.map((player) =>
        <li>{player}</li>
    );

    return (
        <div>
            {roomNumber === undefined ?
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