import React from 'react';
import Cookies from 'js-cookie';
import { navigate } from '@reach/router';

const PrivateArea = () => {

  // check if there’s the token in the cookies. If not, just go back to the login form
  if (!Cookies.get('token')) {
    console.log("No token")
    navigate('/')
  } else {
    console.log("No token")
  }


  return (
    <div>
      Private area!
    </div>
  )
}

export default PrivateArea