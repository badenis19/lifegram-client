import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Cookies from 'js-cookie';
import { SignedInContext } from "../App";
import { useHistory } from 'react-router-dom';

/* Queries */
import { getMyProfileQuery } from '../queries/queries';

const Following = (props) => {

  let history = useHistory;

  let { updateSignIn } = useContext(SignedInContext);

  if (!Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(true);
  }

  const data = props.data;

  const displayFollowing = () => {
    if (data.loading) {
      return (<p>Loading...</p>)
    } else if (data.myProfile.following.length > 0 && !data.loading) {
      return (
        <div>
          {data.myProfile.following.map(user => {
            return (
              <div className="" key={user._id}>
                <p>{user}</p>
              </div>
            )
          })}
        </div>
      )
    } else {
      return (<p>You are not following any user.</p>)
    }
  }

  return (
    <div>
      <p>Following:</p>
      {displayFollowing()}
    </div>
  )
};

export default graphql(getMyProfileQuery)(Following);
