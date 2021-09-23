import './App.css';
import { StartScreen } from './screens/StartScreen';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { JoinScreen } from './screens/JoinScreen';
import { LobbyScreen } from './screens/LobbyScreen';
import { GameScreen } from './screens/GameScreen';
import { GameProvider } from './context/GameContext';
import './firebaseConfig'

function App() {
  return (
    <div className="App">
      <GameProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={StartScreen} />
            <Route exact path="/join" component={JoinScreen} />
            <Route exact path="/lobby" component={LobbyScreen} />
            <Route exact path="/game" component={GameScreen} />
          </Switch>
        </BrowserRouter>
      </GameProvider>
    </div>
  );
}

export default App;
