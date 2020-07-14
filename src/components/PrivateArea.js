import React from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';

const PrivateArea = () => {

  let history = useHistory();

  // check if there’s the token in the cookies. If not, just go back to the login form
  if (!Cookies.get('token')) {
    history.push('/signin');
  }

  return (
    <div>
      PRIVATE AREA
    </div>
  )
}

export default PrivateArea