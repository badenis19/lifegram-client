import React from 'react';
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

  return (
    <ApolloProvider client={client}>
      <Router>

        <div className="App">

          <TopNav />
          <Routes />
          <BottomNav />

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;