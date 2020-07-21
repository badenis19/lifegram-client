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

// creating context
export const SignedInContext = React.createContext();

const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(false);

  // method to update the isSignedIn variable (true or false)
  const updateSignIn = (isSignedIn) => {
    setIsSignedIn(isSignedIn);
  };

  return (
    <ApolloProvider client={client}>
      <Router>

        <div className="App">
          {/* All the components nested inside of the Provider will have access to the context values */}
          <SignedInContext.Provider value={{ isSignedIn, updateSignIn }}>
            <TopNav />
            <Routes />

            {isSignedIn
              &&
              <BottomNav />
            }
          </SignedInContext.Provider>

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;