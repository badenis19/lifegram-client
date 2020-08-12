import React, { useEffect, useContext } from 'react';
import { graphql } from 'react-apollo';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { SignedInContext } from "../App";
import client from '../apollo';
import { Link } from 'react-router-dom';

/* Queries */
import { getMyProfileQuery } from '../queries/queries';

/* Mutations */
import { deletePostMutation } from '../mutations/mutations';

const UserProfile = (props) => {

  let history = useHistory();

  let { updateSignIn } = useContext(SignedInContext);

  if (!Cookies.get('token')) {
    history.push('/signin');
  } else {
    updateSignIn(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const deletePost = async (post) => {
    console.log("deleted");
    console.log(post);

    await client.mutate({
      variables: {
        id: post._id
      },
      mutation: deletePostMutation,
      refetchQueries: () => [{ query: getMyProfileQuery }]
    });
  }

  let data = props.data;
  console.log(data)

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
          <Link to={`/userprofile/${data.myProfile._id}/followers`}>
            <p>Followers: {data.myProfile.followers.length}</p>
          </Link>
          <Link to={`/userprofile/${data.myProfile._id}/following`}>
            <p>Following: {data.myProfile.following.length}</p>
          </Link>
          <p>Posts: {data.myProfile.posts.length}</p>
          <Link to={`/userprofile/${data.myProfile._id}/edit`}>
            <p>Edit Profile</p>
          </Link>


          <br />
          {data.myProfile.posts.map(post => {
            return (
              <div className="post" key={post._id}>
                <img src={post.img} alt="post_image" />
                <p>{post.likes.length > 0 ? `${post.likes.length} like(s)` : "No likes yet"}</p>
                <p>description: {post.description}</p>
                <p>like</p>
                <p>comments:{post.comments}</p>
                <p onClick={() => deletePost(post)}>DELETE</p>
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
