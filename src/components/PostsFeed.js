import React, { useEffect, useContext } from 'react';
import { graphql } from 'react-apollo';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { SignedInContext } from "../App";
import client from '../apollo';

/* Queries */
import { getAllPostsQuery } from '../queries/queries';

/* Mutations */
import { likePostMutation } from '../mutations/mutations';


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

  const likePost = async (post) => {
    console.log("Liked post", post)

    await client.mutate({
      variables: {
        id: post._id
      },
      mutation: likePostMutation,
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
                <p>user: {post.user.username}</p>
                <img src={post.img} alt="post_image" />
                <p>description: {post.description}</p>
                <p onClick={() => likePost(post)}>likes {post.likes.length}</p>
                {/* need Posts to get post */}
                {/* need id of user to check if in array for post */}
                {/* if id in likes color red, else do not  */}
                <p>comments:{post.comments.map(comment => {
                  return (
                    <p>{comment}</p>
                  )
                })}</p>
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
