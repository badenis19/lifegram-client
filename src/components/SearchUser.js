import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { graphql } from 'react-apollo';
import { SignedInContext } from "../App";
import client from '../apollo';

/* Queries */
import { allUsersQuery, getMyProfileQuery } from "../queries/queries";
import { followUserMutation, unfollowUserMutation } from "../mutations/mutations";

const SearchUser = (props) => {

  let history = useHistory();

  let { updateSignIn } = useContext(SignedInContext);

  if (!Cookies.get('token')) {
    history.push('/signin');
  } else {
    updateSignIn(true);
  }

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

  const followUser = async (user) => {
    console.log(user);

    await client.mutate({
      variables: {
        id: user._id
      },
      mutation: followUserMutation,
      refetchQueries: () => [{ query: getMyProfileQuery }]
    });
    // refreshPage();
  }

  const unfollowUser = async (user) => {
    console.log("unfollowing");

    await client.mutate({
      variables: {
        id: user._id
      },
      mutation: unfollowUserMutation,
      refetchQueries: () => [{ query: getMyProfileQuery }]
    });
    // refreshPage();
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
              <span onClick={() => followUser(user)}>follow</span><br/>
              <span onClick={() => unfollowUser(user)}>Unfollow</span><br/><br/>
            </div>
          )
        })
      }

    </div>
  )
};

export default graphql(allUsersQuery)(SearchUser);