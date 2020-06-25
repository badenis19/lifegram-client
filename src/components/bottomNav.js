import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const BottomNav = () => {

  return (
    <nav className="bottom-nav">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/newpost">
            <li>New Post</li>
          </Link>

          <Link to="/userprofile">
            <li>Profile</li>
          </Link>
        </ul>
    </nav>
  )
}

export default BottomNav;
