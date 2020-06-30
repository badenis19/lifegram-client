import { Route, Switch } from "react-router-dom";
import React from 'react';


/* Component */
import PostsFeed from './PostsFeed';
import NewPost from './NewPost';
import UserProfile from './UserProfile';
import Home from "./Home";
import Signup from "./Signup";

const Routes = () => {

  return (
    <>
      <Switch>

        <Route
          path="/"
          render={() => <PostsFeed />}
          exact
        />

        <Route
          path="/signup"
          render={() => <Signup />}
          exact
        />

        <Route
          path="/home"
          render={() => <Home />}
          exact
        />

        <Route
          path="/posts"
          render={() => <PostsFeed />}
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
