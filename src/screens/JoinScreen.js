import { TextField } from '@mui/material';
import { useState, useContext, useRef, useEffect } from "react";
import { joinRoom } from '../api/apiFunctions';
import { Divider } from '../components/Divider';
import { GameContext } from '../context/GameContext';
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

export const JoinScreen = () => {
    const { state } = useContext(GameContext)

    const [roomNumber, setRoomNumber] = useState(null);
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [players, setPlayers] = useState([state.username]);
    const isFirstRender = useRef(true);

    const handleRoomNumberChange = (event) => {
        setRoomNumber(event.target.value);
    };

    const handleEnterKey = async (e) => {
        if (e.keyCode === 13) {
            await joinRoom(roomNumber, state.username)
            setJoinedRoom(true)
        }
    }

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
            {!joinedRoom ?
                <div>
                    <h2>Room number:</h2>
                    <Divider />
                    <div onKeyDown={handleEnterKey}>
                        <TextField
                            id="outlined-basic"
                            label="Room number" variant="outlined"
                            onChange={handleRoomNumberChange}
                        />
                    </div>
                </div>
                :
                <div>
                    <h3>The code of your room is {roomNumber}</h3>
                    <ul>{listPlayers}</ul>
                </div>
            }
        </div>
    )
}