import React from 'react';
import { Link } from 'react-router-dom';

const BottomNav = () => {

  return (
    <nav className="bottom-nav">
      <ul>
        <Link to="/posts">
          <li>Posts</li>
        </Link>

        <Link to="/searchuser">
          <li>Search</li>
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
};

export default BottomNav;
