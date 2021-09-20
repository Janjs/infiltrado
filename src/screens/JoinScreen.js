import Button from '@mui/material/Button';
import { useState } from "react";

export const JoinScreen = () => {
    const [text, setText] = useState("Unirte")

    const handleClick = () => {
        setText("Hola")
    }

    return (
        <div>
            <div>{text} Screen</div>
            <button onClick={handleClick}>Cambiar texto</button>
        </div>
    )
}