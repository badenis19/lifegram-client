import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const SearchUser = () => {

  let history = useHistory();

  if (!Cookies.get('token')) {
    history.push('/signin');
  }

  let [user, setUser] = useState("");
  console.log(user);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // console.log("user");
  }

  // TO DO: Make query to fetch users, bind it to component, use data to populate the area
  // const displayUserSearch = () => {
  //   //
  // }

  return (
    <div>
      <h1>Search User</h1>
      {/* maybe create component for the search bar */}
      <form onSubmit={(e) => handleSearchSubmit(e)}>
        <input onChange={(e) => setUser(e.target.value)} type="text" placeholder="Search" />
        <button>Search</button>
      </form>

      <ul>
        <li>List of user below:</li>
      </ul>
    </div>
  )
};

export default SearchUser;
