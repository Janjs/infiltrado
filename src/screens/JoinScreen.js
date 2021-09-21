import { TextField, Button } from '@mui/material';
import { useState } from "react";
import { Divider } from '../components/Divider';

export const JoinScreen = () => {
    const [roomNumber, setRoomNumber] = useState(null);

    const handleRoomNumberChange = (event) => {
        setRoomNumber(event.target.value);
    };

    const handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            console.log("Enter key pressed")
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