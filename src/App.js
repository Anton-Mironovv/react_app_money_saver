import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {UserContext} from './UserContext';
import Navigation from './Components/Navigation';
import FindUser from './FindUser';

const App = () => {
  const { user, setUser} = FindUser();
  
    return (
      <UserContext.Provider value={{
        user, setUser
      }}>
    <BrowserRouter>
        <Navigation />
    </BrowserRouter>
    </UserContext.Provider>
    );
  
}

export default App;
