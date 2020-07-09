import React from 'react';
import { ApolloProvider } from 'react-apollo'; // binds apollo to React
import { BrowserRouter as Router } from "react-router-dom";
import client from './apollo';
import { navigate } from '@reach/router';

/* Styles */
import './App.scss';

/* Component */
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import Routes from './components/Routes';
import PrivateArea from './components/PrivateArea';

const App = () => {

  return (
    <ApolloProvider client={client}>
      <Router>

        <div className="App">

          <TopNav />
          {/* <PrivateArea /> */}
          <Routes />
          <BottomNav />

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
