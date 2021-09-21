import { useEffect, useState, useContext } from "react"
import { GameContext } from '../context/GameContext';
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import { useHistory } from "react-router-dom"

export const LobbyScreen = () => {
    let history = useHistory()
    const db = getDatabase();
    const { state, dispatch } = useContext(GameContext)

    const [players, setPlayers] = useState([state.username])

    const getRoomNumber = () => {
        let randomNum = Math.floor(Math.random() * 9999)

        const dbRef = ref(getDatabase());
        get(child(dbRef, 'rooms/' + randomNum)).then((snapshot) => {
            if (snapshot.exists()) {
                getRoomNumber()
            } else {
                set(ref(db, 'rooms/' + randomNum), [state.username]);
            }
        }).catch((error) => {
            console.error(error);
        });

        return randomNum
    }

    const listenForNewPlayers = () => {
        const roomNumberRef = ref(db, 'rooms/' + state.roomNumber);
        onValue(roomNumberRef, (data) => {
            console.log(data.val())
            setPlayers([...players, data.val()])
        });
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

    console.log(players)

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