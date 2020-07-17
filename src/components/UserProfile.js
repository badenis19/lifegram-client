import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

/* Queries */
import { getMyProfileQuery } from '../queries/queries';

const UserProfile = (props) => {

  let history = useHistory();

  if (!Cookies.get('token')) {
    history.push('/signin');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let data = props.data;

  const displayUserDetails = () => {
    if (data.loading) {
      return (<p>Loading...</p>)
    } else if (!data.myProfile) {
      return (<p>No users have been loaded. Contact admin.</p>)
    } else {
      return (
        <div className="user-info-and-stats">
          <p>username: {data.myProfile.username}</p>
          <p>description: {data.myProfile.description}</p>
          <img id="profile-picture" src={data.myProfile.img} alt="user_image" />
          <p>Followers: {data.myProfile.followers.length}</p>
          <p>Following: {data.myProfile.following.length}</p>
          <p>Posts: {data.myProfile.posts.length}</p>
          <br />
          {data.myProfile.posts.map((post) => {
            return (
              <div className="post" key={post._id}>
                <img src={post.img} alt="post_image" />
                <p>description: {post.description}</p>
                <p>likes {post.likes}</p>
                <p>comments:{post.comments}</p>
              </div>
            )
          })}
        </div>
      )
    }
  }

  return (
    <div>
      {displayUserDetails()}
    </div>
  )
}

export default graphql(getMyProfileQuery)(UserProfile); // query result accessible via props
