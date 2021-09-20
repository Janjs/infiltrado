import { useEffect, useState } from "react"


export const GameScreen = () => {

    const [roomCode, setRoomCode] = useState("d");

    useEffect (() => {
        var randomNum = Math.floor(Math.random() * 9999)
        setRoomCode(randomNum)
    }, [])

    return (

        <div>
            <div>The code of your room is:</div>
            <div>{roomCode}</div> 

        </div>
    )
}