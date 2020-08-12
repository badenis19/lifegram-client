import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { SignedInContext } from "../App";
import client from '../apollo';

/* Queries */
import { getAllPostsQuery } from '../queries/queries';
import { getMyProfileQuery } from '../queries/queries';

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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });

  let postData = props.getAllPostsQuery;
  let profileData = props.getMyProfileQuery;

  const getConnectedUserID = () => {
    if (profileData.loading) {
      return (<p>Loading...</p>)
    } else if (!profileData.loading) {
      return profileData.myProfile._id
    } 
  }

  let userID = getConnectedUserID();

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
    if (postData.loading) {
      return (<p>Loading...</p>)
    } else if (postData.posts) {
      return (
        <div>
          {postData.posts.map((post) => {
            return (
              <div className="post" key={post._id}>
                <p>user: {post.user.username}</p>
                <img src={post.img} alt="post_image" />
                <p>{post.likes.length > 0 ? `${post.likes.length} like(s)` : "No likes yet"}</p>
                <p>description: {post.description}</p>
                <p className={ post.likes.includes(userID) ? "red" : "" } onClick={() => likePost(post)}>like</p>
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

// export default graphql(getAllPostsQuery)(PostsFeed);
export default compose(
  graphql(getAllPostsQuery, { name: "getAllPostsQuery" }),
  graphql(getMyProfileQuery, { name: "getMyProfileQuery" })
)(PostsFeed);

