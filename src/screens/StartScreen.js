import React, { useState, useEffect } from 'react';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Divider } from '../components/Divider';
import { GameContext } from '../context/GameContext';

export const StartScreen = () => {
    const { state, dispatch } = React.useContext(GameContext)

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [usernameFTStatus, setUsernameFTStatus] = useState(false);
    const [usernameAdded, setUsernameAdded] = useState(false);

    useEffect(() => {
        if (state.username !== undefined) {
            setUsernameAdded(true)
        }
    }, [])

    const writeUserData = (gameId, username) => {
        // TODO
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
                setUsernameError("Username cannot be empty.")
            } else {
                dispatch({ type: "SET_USERNAME", payload: username })
                setUsernameAdded(true)
                writeUserData('1234', username)
            }
        }
    }

    return (
        <div>
            <h1 className="title">Inflitrado</h1>
            {usernameAdded ?
                <div className="start-buttons">
                    <h3>Your username: {state.username}</h3>
                    <Link to="/join" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined">Join</Button>
                    </Link>
                    <Divider />
                    <Link to="/game" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined">Create</Button>
                    </Link>
                </div>
                :
                <div onKeyDown={handleEnterKey}>
                    <TextField
                        id="outlined-basic"
                        label="Username" variant="outlined"
                        onChange={handleUsernameChange}
                        helperText={usernameError}
                        error={usernameFTStatus}
                    />
                </div>
            }
        </div>
    )
}