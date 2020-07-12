import React from 'react';
import { ApolloProvider } from 'react-apollo'; // binds apollo to React
import { BrowserRouter as Router } from "react-router-dom";
import client from './apollo';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

/* Styles */
import './App.scss';

/* Component */
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import Routes from './components/Routes';

const App = () => {

  let history = useHistory();

  if (Cookies.get('token')) {
    history.push('/private-area');
  } 

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