import React from 'react';
import { graphql } from 'react-apollo'; // To bind Apollo with React Component


/* Queries */
import { getUserPostsQuery } from '../queries/queries'

const UserProfile = (props) => {

  // console.log(posts)
  let data = props.data;

  const displayPosts = () => {

    if (data.loading) {
      return (<p>Loading...</p>)
    } else {
      return data.posts.map(post => {
        console.log(">>>", post.img)
        return (
          <div key={post.id}>
            <p>{post.user["username"]}</p>
            <p>{post.img}</p>
            <p>{post.description}</p>
            <p>{post.likes}</p>
            <p>comments:{post.comments}</p>
            <br/>
            <br/>
          </div>
        )
      })
    }
  }

  return (
    <div>
      <h1>UserProfile</h1>
      {displayPosts()}
    </div>
  )
}

export default graphql(getUserPostsQuery)(UserProfile); // query result accessible via props
