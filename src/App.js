import React, { useState } from 'react';
import { ApolloProvider } from 'react-apollo'; // binds apollo to React
import { BrowserRouter as Router } from "react-router-dom";
import client from './apollo';

/* Styles */
import './App.scss';

/* Component */
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import Routes from './components/Routes';

const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Router>

        <div className="App">

          <TopNav isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
          <Routes isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
          <BottomNav isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;