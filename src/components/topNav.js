import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const TopNav = ({isSignedIn, setIsSignedIn}) => {

  let history = useHistory();

  // console.log("isSignedIn", isSignedIn)

  const handleSignOut = () => {
    // remove token cookie 
    Cookies.remove('token');
    setIsSignedIn(false);
    console.log(isSignedIn)
    // redirect to sign in page
    history.push('/signin');
  };

  return (
    <nav className="top-nav">
      <ul>
        <Link to="/signup">
          <li>Sign up</li>
        </Link>

        <Link to="/">
          <li><strong>LIFEGRAM</strong></li>
        </Link>

        <Link to="/signIn">
          <li>Sign in</li>
        </Link>

        <li onClick={() => handleSignOut()}>Sign out</li>
      </ul>
    </nav>
  )
};

export default TopNav;
