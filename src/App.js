import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'; // binds apollo to React
import { BrowserRouter as Router } from "react-router-dom";

/* Styles */
import './App.scss';

/* Component */
import TopNav from './components/topNav';
import BottomNav from './components/bottomNav';
import Routes from './components/Routes';

const App = () => {

  const client = new ApolloClient({
    uri: "http://localhost:4001/graphql" //apollo knows we will be making requests to this end-point from our application
    // uri: "https://techworld-api.herokuapp.com/graphql" 
  })

  return (
    <Router>
      <ApolloProvider client={client}>

      <div className="App">

        <TopNav />
        <Routes />
        <BottomNav />

      </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
