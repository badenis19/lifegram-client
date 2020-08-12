import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Cookies from 'js-cookie';
import { SignedInContext } from "../App";
import { useHistory } from 'react-router-dom';

/* Queries */
import { getMyProfileQuery } from '../queries/queries';

const Followers = (props) => {

  let history = useHistory;

  let { updateSignIn } = useContext(SignedInContext);

  if (!Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(true);
  }

  const data = props.data;
  console.log(data)

  // using id of follower return follower or store entire object of follower
  const displayFollowers = () => {
    if (data.loading) {
      return (<p>Loading...</p>)
    } else if (data.myProfile.followers.length > 0 && !data.loading) {
      return (
        <div>
          {data.myProfile.followers.map(follower => {
            return (
              <div className="" key={follower}>
                <p>{follower}</p>
              </div>
            )
          })}
        </div>
      )
    } else {
      return (<p>No followers</p>)
    }
  }

  return (
    <div>
      <p>Followers:</p>
      {displayFollowers()}
    </div>
  )
};

export default graphql(getMyProfileQuery)(Followers);
