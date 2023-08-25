import React from 'react';
import './App.css';
import HomePage from '../src/pages/HomePage';
import AuthPage from '../src/pages/AuthPage';
import NavBar from './components/NavBar';
import { Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div>
        <Routes>
          <Route path = '/' element = {<HomePage/>}/>
          <Route path = '/authPage' element = {<AuthPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;