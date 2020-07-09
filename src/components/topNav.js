import React from 'react';
import { Link } from 'react-router-dom';

const TopNav = () => {

  return (
    <nav className="top-nav">
      <ul>
        <Link to="/signup">
          <li>Sign up</li>
        </Link>

        <Link to="/">
          <li><strong>LIFEGRAM</strong></li>
        </Link>

        <Link to="/home">
          <li>Sign in</li>
        </Link>
      </ul>
    </nav>
  )
}

export default TopNav;
