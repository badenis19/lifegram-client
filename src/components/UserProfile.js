import React, { useEffect, useContext } from 'react';
import { graphql } from 'react-apollo';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { SignedInContext } from "../App";
import client from '../apollo';
import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';
import plusCircleFill from '@iconify/icons-bi/plus-circle-fill';





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
  console.log(">>>", data)

  const displayUserDetails = () => {
    console.log("+++", data)
    if (data.loading) {
      return (<p>Loading...</p>)
    } else if (!data.myProfile) {
      return (<p>No users have been loaded. Contact admin.</p>)
    } else {
      return (
        <div className="user-info-and-stats">
          <h2>{data.myProfile.username}</h2>
          <div className="button-grid-container">
            <div className="top-grid anchor-img">
              <div className="grid-item item1">
                <div className="grid1-circle"></div>
                <div className="item-text">
                  <div>{data.myProfile.age}</div>
                  <div>Age</div>
                </div>
              </div>
              <div className="grid-item item2">
                <div className="grid2-circle"></div>
                <div className="item-text">
                  <div>1.77m</div>
                  <div>Height</div>
                </div>
              </div>
              <div className="profile-pic"></div>
              <div className="img-overlay">
                <div>
                  <span> Edit </span>
                  <Icon icon={plusCircleFill} />
                </div>
              </div>
              <div className="circle-white"></div>
            </div>

            <div className="bottom-grid">
              <div className="grid-item item3">
                <div className="grid3-circle"></div>
                <div className="item-text">
                  <div>{data.myProfile.followers.length}</div>
                  <div>Followers</div>
                </div>
              </div>
              <div className="grid-item item4">
                <div className="grid4-circle"></div>
                <div className="item-text">
                  <div>{data.myProfile.following.length}</div>
                  <div>Following</div>
                </div>
              </div>
            </div>
          </div>

          <p>description: {data.myProfile.description}</p>
          {/* <img id="profile-picture" src={data.myProfile.img} alt="user_image" />
          <Link to={`/userprofile/${data.myProfile._id}/followers`}>
            <p>Followers: {data.myProfile.followers.length}</p>
          </Link>
          <Link to={`/userprofile/${data.myProfile._id}/following`}>
            <p>Following: {data.myProfile.following.length}</p>
          </Link>
          <p>Posts: {data.myProfile.posts.length}</p>
          <Link to={`/userprofile/${data.myProfile._id}/edit`}>
            <p>Edit Profile</p>
          </Link> */}


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

  // const editProfileButtons = () => {
  //   return (

  //   )
  // }

  return (
    <div>
      {displayUserDetails()}
    </div>
  )
}

export default graphql(getMyProfileQuery)(UserProfile); // query result accessible via props


{/* <div className="button-grid-container anchor-img">
            <div className="profile-pic"></div>
            <div className="grid-item grid-item1">
              <div className="button-text">
                <span className="edit-span1">{data.myProfile.posts.length}</span>
                <span className="edit-span2">Posts</span>
              </div>
            </div>
            <div className="grid-item grid-item2">
              <div className="button-text">
                <span>{data.myProfile.followers.length}</span>
                <span>Followers</span>
              </div>
            </div>
            <div className="grid-item grid-item3">
              <div className="button-text">
                <span className="edit-span1" >Ed</span>
                <span className="edit-span2">pic</span>
              </div>
            </div>
            <div className="grid-item grid-item4">
              <div className="button-text">
                <span>{data.myProfile.following.length}</span>
                <span>Following</span>
              </div>
            </div>
          </div> */}