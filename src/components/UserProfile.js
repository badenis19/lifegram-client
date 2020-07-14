import React, { useEffect } from 'react';
import { graphql } from 'react-apollo'; // To bind Apollo with React Component


/* Queries */
import { getSingleUserDetailsQuery } from '../queries/queries';

const UserProfile = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let data = props.data;

  const displayUserDetails = () => {
    console.log(data);
    if (data.loading) {
      return (<p>Loading...</p>)
    } else if (!data.user) {
      return (<p>No users have been loaded. Contact admin.</p>)
    } else {
      return (
        <div className="user-info-and-stats">
          <p>username: {data.user.username}</p>
          <p>description: {data.user.description}</p>
          <img id="profile-picture" src={data.user.img} alt="user_image"/>
          <p>Followers: {data.user.followers.length}</p>
          <p>Following: {data.user.following.length}</p>
          <p>Posts: {data.user.posts.length}</p>
          <br />
          {data.user.posts.map((post) => {
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

export default graphql(getSingleUserDetailsQuery)(UserProfile); // query result accessible via props
