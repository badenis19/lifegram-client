import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let [userList, setUserList] = useState([]);
  let [searchText, setSearchText] = useState("");

  let searchInput = document.getElementById("search-user-input");

  const searchUsers = () => {
    const res = props.allUsersQuery.users.filter(user => {
      return user.username.toLowerCase().includes(searchText);
    })
    setUserList(res);
  }

  const handleCancel = () => {
    searchInput.value = ""
    setUserList([]);
  };

  const getConnectedUserFollowingArray = () => {
    if (props.getMyProfileQuery.loading) {
      return (<p>Loading...</p>)
    } else if (!props.getMyProfileQuery.loading) {
      return props.getMyProfileQuery.myProfile.following
    }
  }

  // following array from currently connected user
  const followingArray = getConnectedUserFollowingArray();

  const followUser = async (user) => {
    console.log("following/unfollow", user._id);

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
                    <span className="custom-button-follow btn-blue " onClick={() => followUser(user)}><p>{followingArray.includes(user._id) ? "unfollow" : "follow"}</p></span><br />
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

export default compose(
  graphql(allUsersQuery, { name: "allUsersQuery" }),
  graphql(getMyProfileQuery, { name: "getMyProfileQuery" })
)(SearchUser);