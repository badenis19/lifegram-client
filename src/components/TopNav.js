import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { SignedInContext } from "../App"

const TopNav = () => {

  let history = useHistory();

  let { isSignedIn, updateSignIn } = useContext(SignedInContext);

  const handleSignOut = () => {
    // remove token cookie 
    Cookies.remove('token');
    // updating the context isSignedIn to false
    updateSignIn(false);
    // redirect to sign in page
    history.push('/signin');
  };

  return (
    <nav className="top-nav">
      <ul>

        {!isSignedIn &&
          <Link to="/signup">
            <li>Sign up</li>
          </Link>}

        <Link to="/">
          <li><strong>FITGRAM</strong></li>
        </Link>

        {!isSignedIn &&
          <Link to="/signIn">
            <li>Sign in</li>
          </Link>}

        {isSignedIn &&
          <li className="sign-out" onClick={() => handleSignOut()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path d="M16 13v-2H7V8l-5 4l5 4v-3z" fill="#626262" /><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" fill="#626262" /></svg>
            <span>Signout</span>
          </li>
        }

      </ul>
    </nav>
  )
};

export default TopNav;
