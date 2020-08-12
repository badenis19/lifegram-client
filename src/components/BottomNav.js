import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import roundPostAdd from '@iconify/icons-ic/round-post-add';
import roundHome from '@iconify/icons-ic/round-home';
import roundSearch from '@iconify/icons-ic/round-search';
import bxsUser from '@iconify/icons-bx/bxs-user';

const BottomNav = () => {

  return (
    <nav className="bottom-nav">
      <ul>

        <div>
          <NavLink activeClassName='is-active' to="/posts">
            <li>
              <Icon icon={roundHome} />
            </li>
            <span>
              Feed
          </span>
          </NavLink>
        </div>

        <div>
          <NavLink activeClassName='is-active' to="/searchuser">
            <li>
              <Icon icon={roundSearch} />
            </li>
            <span>
              Search
          </span>
          </NavLink>
        </div>

        <div>
          <NavLink activeClassName='is-active' to="/newpost">
            <li>
              <Icon icon={roundPostAdd} />
            </li>
            <span>
              New post
          </span>
          </NavLink>
        </div>

        <div>
          <NavLink activeClassName='is-active' to="/userprofile">
            <li>
              <Icon icon={bxsUser} />
            </li>
            <span>
              Profile
          </span>
          </NavLink>
        </div>
      </ul>
    </nav>
  )
};

export default BottomNav;
