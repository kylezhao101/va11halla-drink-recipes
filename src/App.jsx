import React from 'react';
import './App.css';
import HomePage from '../src/pages/HomePage';
import { BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <HomePage />
      </Router>
    </div>
  );
}

export default App;