import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

/* Styles */
import './App.scss';

/* Component */
import TopNav from './components/topNav';
import BottomNav from './components/bottomNav';
import Home from './components/Home';
import Routes from './components/Routes';

const App = () => {
  return (
    <Router>
      
      <div className="App">

        <TopNav />
        <Routes />
        <BottomNav />

      </div>

    </Router>
  );
}

export default App;
