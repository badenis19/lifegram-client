import React from 'react';
import { graphql } from 'react-apollo'; // To bind Apollo with React Component

/* Queries */
import { getAllPostsQuery } from '../queries/queries';

const Home = (props) => {

  let data = props.data;
  console.log(props);

  const displayAllPosts = () => {
    if (data.loading) {
      return (<p>Loading...</p>)
      // (TO ADD) else if array is empty return there are no posts
    } else {
      return (
        <div>
          {data.posts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <p>user: {post.user["username"]}</p>
                <img src={post.img} alt="post_image"/>
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
      {displayAllPosts()}
    </div>
  )
}

export default graphql(getAllPostsQuery)(Home) ;
