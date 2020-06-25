import React from 'react';
import { graphql } from 'react-apollo'; // To bind Apollo with React Component


/* Queries */
import { getSingleUserDetailsQuery } from '../queries/queries';

const UserProfile = (props) => {

  // console.log(posts)
  let data = props.data;
  console.log(data);

  const displayUsers = () => {
    if (data.loading) {
      return (<p>Loading...</p>)
    } else {
      return (
        <div>
          <p>username: {data.user.username}</p>
          <p>description: {data.user.description}</p>
          <img src={data.user.img} alt="user_image"/>
          <p>Followers: {data.user.followers.length}</p>
          <p>Following: {data.user.following.length}</p>
          <p>Posts: {data.user.posts.length}</p>
          <br />
          {data.user.posts.map((post) => {
            return (
              <div key={post.id}>
                <img src={post.img} alt="post_image"/>
                <p>description: {post.description}</p>
                <p>likes {post.likes}</p>
                <p>comments:{post.comments}</p>
                <br />
              </div>
            )
          })}
        </div>
      )
    }
  }

  return (
    <div>
      {displayUsers()}
    </div>
  )
}

export default graphql(getSingleUserDetailsQuery)(UserProfile); // query result accessible via props
