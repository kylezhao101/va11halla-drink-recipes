import React from 'react';
import './App.css';
import HomePage from '../src/pages/HomePage';
import AuthPage from '../src/pages/AuthPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Route, Routes} from 'react-router-dom';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavBar/>
        <div>
          <Routes>
            <Route path = '/' element = {<HomePage/>}/>
            <Route path = '/authPage' element = {<AuthPage/>}/>
          </Routes>
        </div>
        <Footer/>
      </UserProvider>
    </div>
  );
}

export default App;