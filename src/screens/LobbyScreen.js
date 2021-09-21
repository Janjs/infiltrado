import { useEffect, useState } from "react"


export const LobbyScreen = () => {

    const [roomCode, setRoomCode] = useState("d");

    useEffect(() => {
        var randomNum = Math.floor(Math.random() * 9999)
        setRoomCode(randomNum)
    }, [])

    return (

        <div>
            <h3>The code of your room is {roomCode}</h3>
        </div>
    )
}