import React from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const PrivateArea = () => {

  let history = useHistory();

  // check if there’s the token in the cookies. If not, just go back to the login form
  if (!Cookies.get('token')) {
    history.push('/signin');
  } 

  return (
    <div>
      Private area!
    </div>
  )
}

export default PrivateArea