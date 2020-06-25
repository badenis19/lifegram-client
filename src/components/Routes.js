import { Route, Switch } from "react-router-dom";
import React from 'react';


/* Component */
import Home from './Home';
import NewPost from './NewPost';
import UserProfile from './UserProfile';

const Routes = () => {

  return (
      <>
        <Switch>

          <Route
            path="/"
            render={() => <Home />}
            exact
          />

          <Route
            path="/home"
            render={() => <Home />}
            exact
          />

          <Route
            path="/newpost"
            render={() => <NewPost />}
            exact
          />

          <Route
            path="/userprofile"
            render={() => <UserProfile />}
          />

          {/* <Route
            path="/products/:id"
            render={(props) => <SingleProduct {...props} products={products} />}
          /> */}

          
        </Switch>
      </>
  )
}

export default Routes;
