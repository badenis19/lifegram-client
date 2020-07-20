import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { graphql } from 'react-apollo';

/* Queries */
import { allUsersQuery } from "../queries/queries"
import { empty } from 'apollo-boost';

const SearchUser = (props) => {

  let history = useHistory();

  if (!Cookies.get('token')) {
    history.push('/signin');
  };

  let [userList, setUserList] = useState([]);
  let [searchText, setSearchText] = useState("");
  
  let searchInput = document.getElementById("search-user-input");

  const searchUsers = () => {

    if(searchInput.value.length === 0){
      console.log("empty");
      setUserList([0]);
    }
    
    const res = props.data.users.filter(user => {
      return user.username.toLowerCase().includes(searchText);
    })
    setUserList(res);
  }

  const handleCancel = () => {
    setSearchText('');
    setUserList([]);
  }

  return (
    <div>
      <h1>Search User</h1>
      <input id="search-user-input" onKeyUp={() => searchUsers()} onChange={(e) => setSearchText(e.target.value.toLowerCase())} type="text" placeholder="Search" />
      <button onClick={() => handleCancel()}>cancel</button>

      <h3>List of user below:</h3>
      {/* {<p>{userList.length}</p>} */}
      {/* {!userList.length ? <p>No results found</p> : <p>{userList.length} result(s)</p>} */}
      {/* {!userList.length ? <p>No results found</p> : <p>{userList.length} result(s)</p>} */}
      {searchText.length > 0 &&
        userList.map(user => {
          return (
            <div key={user._id}>
              <p>username: {user.username}</p>
              <img src={user.img} alt="" />
            </div>
          )
        })
      }

    </div>
  )
};

export default graphql(allUsersQuery)(SearchUser);