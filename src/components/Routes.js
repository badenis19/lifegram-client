import { Route, Switch } from "react-router-dom";
import React from 'react';

/* Component */
import PostsFeed from './PostsFeed';
import NewPost from './NewPost';
import UserProfile from './UserProfile';
import SignIn from "./SignIn";
import Signup from "./Signup";
import SearchUser from "./SearchUser";
import EditProfile from "./EditProfile";

// import Comments from "./Comments";

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
          path="/signin"
          render={() => <SignIn />}
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
          exact
        />

        <Route
          path="/userprofile/:id/edit"
          render={(props) => <EditProfile {...props} />}
          exact
        />
        <Route
          path="/searchuser"
          render={() => <SearchUser />}
          exact
        />

      </Switch>
    </>
  )
}

export default Routes;
