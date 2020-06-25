import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const BottomNav = () => {

  return (
    <nav className="bottom-nav">
      {/* <div> */}
        <ul>
          {/* <Link to="/"> */}
            <li>Home</li>
          {/* </Link> */}

          {/* <Link to="/"> */}
            <li>New Post</li>
          {/* </Link> */}

          {/* <Link to="/contact"> */}
            <li>Profile</li>
          {/* </Link> */}
        </ul>
      {/* </div> */}
    </nav>
  )
}

// Nav.propTypes = {
//   ??: PropTypes.??
// }

export default BottomNav;
