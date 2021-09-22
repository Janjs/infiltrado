import { TextField } from '@mui/material';
import { useState, useContext, useRef, useEffect } from "react";
import { joinRoom } from '../api/apiFunctions';
import { Divider } from '../components/Divider';
import { ListPlayers } from '../components/ListPlayers';
import { GameContext } from '../context/GameContext';

export const JoinScreen = () => {
    const { state } = useContext(GameContext)

    const [roomNumber, setRoomNumber] = useState(null);
    const [joinedRoom, setJoinedRoom] = useState(false);

    const handleRoomNumberChange = (event) => {
        setRoomNumber(event.target.value);
    };

    const handleEnterKey = async (e) => {
        if (e.keyCode === 13) {
            await joinRoom(roomNumber, state.username)
            setJoinedRoom(true)
        }
    }

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
                <ListPlayers roomNumber={roomNumber} />
            }
        </div>
    )
}