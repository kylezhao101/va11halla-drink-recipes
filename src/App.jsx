import React from 'react';
import './App.css';
import HomePage from '../src/pages/HomePage';
import AuthPage from '../src/pages/AuthPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { FavouritesProvider } from './context/FavouritesContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <FavouritesProvider>
          <NavBar />
          <div>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/authPage' element={<AuthPage />} />
            </Routes>
          </div>
          <Footer />
        </FavouritesProvider>
      </UserProvider>
    </div>
  );
}

export default App;