import './App.css';
import { StartScreen } from './screens/StartScreen';
import { firebaseConfig } from './config';
import { initializeApp } from 'firebase/app';

function App() {
  const firebase = initializeApp(firebaseConfig);

  return (
    <div className="App">
      <StartScreen />
    </div>
  );
}

export default App;
