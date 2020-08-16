import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { SignedInContext } from "../App"
import { Icon } from '@iconify/react';
import bxLogOut from '@iconify/icons-bx/bx-log-out';

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
            <Icon icon={bxLogOut} />
            <span>Signout</span>
          </li>
        }
      </ul>
    </nav>
  )
};

export default TopNav;
