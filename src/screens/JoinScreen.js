import { TextField } from '@mui/material';
import { useState, useContext } from "react";
import { joinRoom } from '../api/apiFunctions';
import { Divider } from '../components/Divider';
import { GameContext } from '../context/GameContext';

export const JoinScreen = () => {
    const { state } = useContext(GameContext)

    const [roomNumber, setRoomNumber] = useState(null);

    const handleRoomNumberChange = (event) => {
        setRoomNumber(event.target.value);
    };

    const handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            joinRoom(roomNumber, state.username)
        }
    }

    return (
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
    )
}