import React from 'react';
import './App.scss';

/* Component */
import TopNav from './components/topNav';
import BottomNav  from './components/bottomNav';

const App = () => {
  return (
    <div className="App">
      <TopNav />

      <BottomNav />
    </div>
  );
}

export default App;
