import { Route, Switch } from "react-router-dom";
import React from 'react';

/* Component */
import PostsFeed from './PostsFeed';
import NewPost from './NewPost';
import UserProfile from './UserProfile';
import SignIn from "./SignIn";
import Signup from "./Signup";
import SearchUser from "./SearchUser";
// import Comments from "./Comments";

const Routes = ({ isSignedIn, setIsSignedIn }) => {

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
          render={() => <SignIn isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />}
          exact
        />

        <Route
          path="/posts"
          render={() => <PostsFeed />}
          exact
        />

        {/* <Route
          path="/:postid/comments"
          render={() => <Comments />}
        /> */}

        <Route
          path="/newpost"
          render={() => <NewPost />}
          exact
        />

        <Route
          path="/userprofile"
          render={() => <UserProfile />}
        />

        <Route
          path="/searchuser"
          render={() => <SearchUser />}
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
