import React from 'react';
import './App.css';
import HomePage from '../src/pages/HomePage';
import Signup from './components/Signup';
import { BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Signup />
        <HomePage />
      </Router>
    </div>
  );
}

export default App;