import * as React from 'react'

export const game = {
    username: undefined,
    players: [],
    roomNumber: undefined,
    isHost: false
};

const GameContext = React.createContext()

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERNAME': {
            return { ...state, username: action.payload }
        }
        case 'SET_ROOMNUMBER': {
            return { ...state, roomNumber: action.payload }
        }
        case 'UPDATE_PLAYERS': {
            return { ...state, players: action.payload }
        }
        case 'SET_ISHOST': {
            return { ...state, isHost: action.payload }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const GameProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(gameReducer, game)
    const value = { state, dispatch }

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export { GameProvider, GameContext }