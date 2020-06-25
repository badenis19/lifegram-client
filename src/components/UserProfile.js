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
          <p>{data.user.username}</p>
          <p>{data.user.description}</p>
          <p>Followers: {data.user.followers.length}</p>
          <p>Following: {data.user.following.length}</p>
          <p>Posts: {data.user.posts.length}</p>
          <br />
          {data.user.posts.map((post) => {
            return (
              <div key={post.id}>
                <p>image: {post.img}</p>
                <p>description: {post.description}</p>
                <p>{post.likes}</p>
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
      <h1>UserProfile</h1>
      {displayUsers()}
    </div>
  )
}

export default graphql(getSingleUserDetailsQuery)(UserProfile); // query result accessible via props
