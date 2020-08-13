import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import UserForm from './UserForm';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SignedInContext } from "../App";

/* Queries */
import { getMyProfileQuery } from '../queries/queries';

const EditProfile = (props) => {

  let history = useHistory();

  let { updateSignIn } = useContext(SignedInContext);

  if (!Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(true);
  }

  let data = props.data;

  const displayForm = () => {
    if (data.loading) {
      return (<p>Loading...</p>)
    } else if (!data.myProfile) {
      return (<p>No users have been loaded. Contact admin.</p>)
    } else if (!data.loading) {
      return (
        <div>
          <UserForm preloadedValues={data.myProfile} />
        </div>
      )
    }
  }

  const editProfileButtons = () => {
    return (
      <div className="button-grid-container">
        <div className="profile-pic"></div>
        <div className="grid-item">
          <div className="button-text">
            <span className="edit-span1">{data.myProfile.posts.length}</span>
            <span className="edit-span2">Posts</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="button-text">
            <span>{data.myProfile.followers.length}</span>
            <span>Followers</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="button-text">
            <span className="edit-span1" >Edit profile</span>
            <span className="edit-span2">picture +</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="button-text">
            <span>{data.myProfile.following.length}</span>
            <span>Following</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="sign-in-up-intro">
        <h3>Edit your profile</h3>
      </div>
      {editProfileButtons()}
      {displayForm()}
    </div>
  )
};

// export default EditProfile;
export default graphql(getMyProfileQuery)(EditProfile);
