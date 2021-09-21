import * as React from 'react'

export const game = {
    username: undefined,
    players: [],
    gameId: undefined
};

const GameContext = React.createContext()

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERNAME': {
            return { ...state, username: action.payload }
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