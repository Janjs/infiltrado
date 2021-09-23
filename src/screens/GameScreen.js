import { useEffect, useState, useContext, useRef } from "react"
import { GameContext } from '../context/GameContext';
import { addWord } from "../api/apiFunctions";
import { TextField } from "@mui/material";
import { Divider } from "../components/Divider";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import '../App.css';

export const GameScreen = () => {
    const { state } = useContext(GameContext)
    const { username, roomNumber, isHost, players } = state;

    const [word, setWord] = useState('');
    const [gameWord, setGameWord] = useState('');
    const [infiltrat, setInfiltrat] = useState('');

    const handleWordChange = (event) => {
        setWord(event.target.value);
    };

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        let randomInt = Math.floor(Math.random() * (max - min + 1)) + min
        if (players[randomInt] === username && isHost) {
            return getRandomInt(min, max)
        } else {
            return randomInt
        }
    }

    const handleEnterKey = async (e) => {
        if (e.keyCode === 13) {
            if (word !== '') {
                let indexInfiltrat = getRandomInt(0, players.length - 1)
                let infiltrat = players[indexInfiltrat]
                setInfiltrat(infiltrat)
                console.log(infiltrat)
                await addWord(roomNumber, word, infiltrat)
            }
        }
    }

    useEffect(() => {
        const listenForNewWord = async () => {
            onSnapshot(doc(db, "rooms", roomNumber), (doc) => {
                if (doc.data() !== undefined) {
                    setGameWord(doc.data().word)
                    setInfiltrat(doc.data().infiltrat)
                }
            });
        }
        listenForNewWord()
    }, []);

    return (
        <div>
            Game Room {roomNumber}
            <Divider />
            {gameWord === '' ?
                <div>
                    {isHost ?
                        <div onKeyDown={handleEnterKey}>
                            <TextField
                                id="outlined-basic"
                                label="Word" variant="outlined"
                                onChange={handleWordChange}
                            />
                        </div>
                        :
                        <div>Waiting for host to add the word</div>
                    }
                </div>
                :
                <div>
                    {
                        username === infiltrat ?
                            <div>You are the "infiltrado"!!</div>
                            :
                            <div>Word: {gameWord}</div>
                    }
                </div>
            }
        </div>
    )
}