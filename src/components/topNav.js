import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { SignedInContext } from "../App"

const TopNav = () => {
  
  let history = useHistory();
 
  const handleSignOut = () => {
    // remove token cookie 
    Cookies.remove('token');
    // redirect to sign in page
    history.push('/signin');
  };

  let isSignedIn = useContext(SignedInContext)
  
  return (
    <nav className="top-nav">
      <ul>

      { console.log(">>",isSignedIn) }

        {!isSignedIn &&
          <Link to="/signup">
            <li>Sign up</li>
          </Link>}

        <Link to="/">
          <li><strong>LIFEGRAM</strong></li>
        </Link>

        {!isSignedIn &&
        <Link to="/signIn">
          <li>Sign in</li>
        </Link>}

        {isSignedIn && <li onClick={() => handleSignOut()}>Sign out</li>}


      </ul>
    </nav>
  )
};

export default TopNav;
