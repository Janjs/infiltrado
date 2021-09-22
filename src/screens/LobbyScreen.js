import { useEffect, useState, useContext, useRef } from "react"
import { GameContext } from '../context/GameContext';
import { useHistory } from "react-router-dom"
import { addRoom } from "../api/apiFunctions";
import { ListPlayers } from "../components/ListPlayers";

export const LobbyScreen = () => {
    let history = useHistory()
    const { state } = useContext(GameContext)

    const [roomNumber, setRoomNumber] = useState(null)

    /*const createGame = () => {
        // dispatch({ type: "SET_ROOMNUMBER", payload: roomNumber })
    }*/

    useEffect(() => {
        const getRoomNumber = async () => {
            const generatedRoomNumber = await addRoom(state.username)
            setRoomNumber(generatedRoomNumber)
        }

        if (state.username === undefined) {
            history.push("/")
        } else {
            getRoomNumber()
        }
    }, [state.username, history])

    return (
        <div>
            {roomNumber === null ?
                <h3>Loading...</h3>
                :
                <ListPlayers roomNumber={roomNumber} />
            }
        </div>
    )
}