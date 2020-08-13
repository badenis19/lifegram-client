import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { SignedInContext } from "../App";
import client from '../apollo';
// import { Icon } from '@iconify/react';
// import dropletIcon from '@iconify/icons-oi/droplet';


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
            console.log(post)
            return (
              <div className="post" key={post._id}>
                <div className="user-details">
                  <img className="profil-avatar" src={post.user.img} alt="" />
                  <p>{post.user.username}</p>
                </div>
                <img className="post-img" src={post.img} alt="post_image" />
                <div className="post-icons">
                  {/* <Icon icon={dropletIcon} color={post.likes.includes(userID) ? "#DC0404" : ""} /> */}
                  <p onClick={() => likePost(post)}><svg xmlns="http://www.w3.org/2000/svg" fill={post.likes.includes(userID) ? "#DC0404" : ""} width="1.5em" height="1.5em" viewBox="0 0 50 50"><path d="M17.962 44.874a1.007 1.007 0 0 1-.05 1.416l-2.172 2.031a.999.999 0 0 1-1.411-.051L1.68 34.638a1.007 1.007 0 0 1 .051-1.416l2.175-2.028a.998.998 0 0 1 1.411.051l12.645 13.629zm16.14-25.65a1.007 1.007 0 0 1-.051 1.416l-13.67 12.77a.999.999 0 0 1-1.411-.051l-3.263-3.521a1.007 1.007 0 0 1 .051-1.416l13.667-12.77a.997.997 0 0 1 1.41.051l3.267 3.521zM22.613 40.527c.374.403.351 1.04-.051 1.416l-2.175 2.03a.998.998 0 0 1-1.411-.051L6.334 30.29a1.007 1.007 0 0 1 .05-1.416l2.171-2.029a.999.999 0 0 1 1.411.051l12.647 13.631zm21.063-20.814a1.007 1.007 0 0 1-.052 1.416l-2.174 2.03a1 1 0 0 1-1.412-.05L27.394 9.48a1.006 1.006 0 0 1 .05-1.416l2.18-2.035a.997.997 0 0 1 1.41.051l12.642 13.633zm4.644-4.34a1.009 1.009 0 0 1-.051 1.417l-2.17 2.029a.997.997 0 0 1-1.41-.05L32.047 5.134a1.009 1.009 0 0 1 .05-1.417l2.172-2.033a.995.995 0 0 1 1.409.05L48.32 15.373z" /></svg></p>
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512"><path fill="#626262" d="M496 496h-16a273.39 273.39 0 0 1-179.025-66.782l-16.827-14.584A291.407 291.407 0 0 1 256 416c-63.527 0-123.385-20.431-168.548-57.529C41.375 320.623 16 270.025 16 216S41.375 111.377 87.452 73.529C132.615 36.431 192.473 16 256 16s123.385 20.431 168.548 57.529C470.625 111.377 496 161.975 496 216a171.161 171.161 0 0 1-21.077 82.151a201.505 201.505 0 0 1-47.065 57.537a285.22 285.22 0 0 0 63.455 97l4.687 4.685zM294.456 381.222l27.477 23.814a241.379 241.379 0 0 0 135 57.86a317.5 317.5 0 0 1-62.617-105.583l-4.395-12.463l9.209-7.068C440.963 305.678 464 262.429 464 216c0-92.636-93.309-168-208-168S48 123.364 48 216s93.309 168 208 168a259.114 259.114 0 0 0 31.4-1.913z" /></svg></p>
                </div>
                <p>{post.likes.length > 0 ? `${post.likes.length} like(s)` : "No likes yet"}</p>
                <p>description: {post.description}</p>
                {/* <p>comments:{post.comments.map(comment => {
                  return (
                    <p>{comment}</p>
                  )
                })}</p> */}
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

