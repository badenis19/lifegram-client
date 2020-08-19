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
  console.log(typeof window.location.href)
  return (
    <nav className="top-nav">
      <ul>
        {!isSignedIn ?
          <Link to="/signup"><li className="signage">Sign up</li></Link>
          :
          <li className="hidden"></li>
        }

        {window.location.href.includes("sign") ?
          <Link to="/"><li className="fitgram">FITGRAM</li></Link>
          :
          <Link to="/"><li className="fitgram"></li></Link>
        }

        {!isSignedIn &&
          <Link to="/signIn">
            <li className="signage">Sign in</li>
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
