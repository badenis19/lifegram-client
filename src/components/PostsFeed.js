import React, { useEffect, useContext } from 'react';
import { graphql } from 'react-apollo';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { SignedInContext } from "../App";

/* Queries */
import { getAllPostsQuery } from '../queries/queries';
// import { updateLikeMutation } from '../mutations/mutations';
// import client from '../apollo';

const PostsFeed = (props) => {

  let history = useHistory();

  let { updateSignIn } = useContext(SignedInContext);

  if (!Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let data = props.data;
  console.log(data);

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
                {/* <p onClick={() => updateLike(post)}>likes {post.likes}</p> */}
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
