import React, { useEffect, useState } from 'react';
import { graphql } from 'react-apollo';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

/* Queries */
import { getAllPostsQuery } from '../queries/queries';
import { toggleLike } from '../mutations/mutations';
import client from '../apollo';

const PostsFeed = (props) => {

  let history = useHistory();
  
  if (!Cookies.get('token')) {
    history.push('/userprofile');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let data = props.data;
  console.log(data)

  const toggleLike = async (post) => {
    console.log(post.likes);

    await client.mutate({
      variables: {
        likes: post.likes
      },
      mutation: toggleLike,
      refetchQueries: () => [{ query: getAllPostsQuery }]
    });
    // refreshPage();
  }

  const displayAllPosts = () => {
    if (data.loading) {
      return (<p>Loading...</p>)
    } else if (data.posts) {
      return (
        <div>
          {data.posts.map((post) => {
            return (
              <div className="post" key={post._id}>
                {/* <p>user: {post.user.username}</p> */}
                <img src={post.img} alt="post_image" />
                <p>description: {post.description}</p>
                <p onClick={() => toggleLike(post)}>likes {post.likes}</p>
                <p>comments:{post.comments}</p>
              </div>
            )
          })}
        </div>
      )
    } else {
      return (<p>There are no posts...</p>)
    }
  }

  return (
    <div>
      {displayAllPosts()}
    </div>
  )
}

export default graphql(getAllPostsQuery)(PostsFeed);
