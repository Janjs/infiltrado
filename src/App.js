import './App.css';
import { StartScreen } from './screens/StartScreen';
import { firebaseConfig } from './config';
import { initializeApp } from 'firebase/app';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { JoinScreen } from './screens/JoinScreen';
import { LobbyScreen } from './screens/LobbyScreen';
import { GameProvider } from './context/GameContext';

function App() {
  const firebase = initializeApp(firebaseConfig);

  return (
    <div className="App">
      <GameProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={StartScreen} />
            <Route exact path="/join" component={JoinScreen} />
            <Route exact path="/game" component={LobbyScreen} />
          </Switch>
        </BrowserRouter>
      </GameProvider>
    </div>
  );
}

export default App;
