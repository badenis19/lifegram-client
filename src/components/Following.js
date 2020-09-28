import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { SignedInContext } from '../App';

/* Queries */
import { getMyProfileQuery } from '../queries/queries';

const Following = (props) => {
  const history = useHistory;

  const { updateSignIn } = useContext(SignedInContext);

  if (!Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(true);
  }

  const { data } = props;

  const displayFollowing = () => {
    if (data.loading) {
      return (<p>Loading...</p>);
    } if (data.myProfile.following.length > 0 && !data.loading) {
      return (
        <div>
          {data.myProfile.following.map((user) => (
            <div className="" key={user}>
              <p>{user}</p>
            </div>
          ))}
        </div>
      );
    }
    return (<p>You are not following any user.</p>);
  };

  return (
    <div>
      <p>Following:</p>
      {displayFollowing()}
    </div>
  );
};

export default graphql(getMyProfileQuery)(Following);
