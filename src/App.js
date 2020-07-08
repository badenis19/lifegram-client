import React from 'react';
// import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'; // binds apollo to React
import { BrowserRouter as Router } from "react-router-dom";
import client from './apollo';

/* Styles */
import './App.scss';

/* Component */
import TopNav from './components/topNav';
import BottomNav from './components/bottomNav';
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
