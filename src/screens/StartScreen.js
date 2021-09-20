import React, { useState, useEffect } from 'react';
import '../App.css';
import { getDatabase, ref, set } from "firebase/database";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const StartScreen = () => {
    const database = getDatabase();

    const [username, setUsername] = useState('');
    const [usernameTitle, setUsernameTitle] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [usernameFTStatus, setUsernameFTStatus] = useState(false);
    const [usernameAdded, setUsernameAdded] = useState(false);

    const writeUserData = (gameId, userName) => {
        /*
        set(ref(database, 'games/' + gameId), {
            users: [username],
        });
        */
    }

    const handleUsernameChange = (event) => {
        setUsernameError('')
        setUsernameFTStatus(false)
        setUsername(event.target.value);
    };

    const handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            if (username === "") {
                setUsernameFTStatus(true)
                setUsernameError("Tu nombre de usuario no puede estar vacío.")
            } else {
                setUsernameTitle(username)
                setUsernameAdded(true)
                writeUserData('1234', username)
            }
        }
    }

    return (
        <div className="start">
            <h1>Inflitrado {usernameTitle}</h1>
            {usernameAdded ?
                <div className="start-buttons">
                    <Button variant="outlined">Unirse</Button>
                    <div style={{ margin: 10 }}></div>
                    <Button variant="outlined">Crear</Button>
                </div>
                :
                <div onKeyDown={handleEnterKey}>
                    <TextField
                        id="outlined-basic"
                        label="Nombre de usuario" variant="outlined"
                        onChange={handleUsernameChange}
                        helperText={usernameError}
                        error={usernameFTStatus}
                    />
                </div>
            }
        </div>
    )
}