import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { graphql } from 'react-apollo';
import { SignedInContext } from "../App";
import client from '../apollo';

/* Queries */
import { allUsersQuery, getMyProfileQuery } from "../queries/queries";

/* Mutations */
import { followUserMutation } from "../mutations/mutations";

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
    console.log("following/unfollow", user.username);

    await client.mutate({
      variables: {
        id: user._id,
        username: user.username,
        img: user.img
      },
      mutation: followUserMutation,
      refetchQueries: () => [{ query: getMyProfileQuery }]
    });
  }

  return (
    <div className="search-bar-and-users">
      {/* <h1>Search User</h1> */}

      <div className="top">
        <input id="search-user-input" onKeyUp={() => searchUsers()} onChange={(e) => setSearchText(e.target.value.toLowerCase())} type="text" placeholder="Search" />
        <button id="cancel-btn" onClick={() => handleCancel()}>cancel</button>
      </div>


      <div className="bottom">
        {searchText.length > 0 &&
          userList.map(user => {
            return (
              <div className="user-card" key={user._id}>

                <div className="left">
                  <img src={user.img} alt="" />
                </div>

                <div className="right">
                  <div>
                    <span className="username">{user.username.toLowerCase()}</span>
                  </div>
                  <div>
                    <span className="custom-button-follow btn-blue " onClick={() => followUser(user)}>follow</span><br />
                  </div>
                </div>
                
              </div>
            )
          })
        }
      </div>

    </div>
  )
};

export default graphql(allUsersQuery)(SearchUser);