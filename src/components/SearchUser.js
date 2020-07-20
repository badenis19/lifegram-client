import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { graphql } from 'react-apollo';

/* Queries */
import { allUsersQuery } from "../queries/queries"

const SearchUser = (props) => {

  let history = useHistory();

  if (!Cookies.get('token')) {
    history.push('/signin');
  };

  let [userList, setUserList] = useState([]);
  let [searchText, setSearchText] = useState("");

  let searchInput = document.getElementById("search-user-input");

  const searchUsers = () => {
    const res = props.data.users.filter(user => {
      return user.username.toLowerCase().includes(searchText);
    })
    setUserList(res);
  }

  const handleCancel = () => {
    searchInput.value = ""
    setUserList([]);
  }

  return (
    <div>
      <h1>Search User</h1>
      <input id="search-user-input" onKeyUp={() => searchUsers()} onChange={(e) => setSearchText(e.target.value.toLowerCase())} type="text" placeholder="Search" />
      <button onClick={() => handleCancel()}>cancel</button>

      <h3>List of user below:</h3>
      {searchText.length > 0 &&
        userList.map(user => {
          return (
            <div key={user._id}>
              <p>{user.username}</p>
              <img src={user.img} alt="" />
            </div>
          )
        })
      }

    </div>
  )
};

export default graphql(allUsersQuery)(SearchUser);