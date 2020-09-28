import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';

import { Icon } from '@iconify/react';
import moment from 'moment';
import plusCircleFill from '@iconify/icons-bi/plus-circle-fill';
import crossMark from '@iconify/icons-emojione-v1/cross-mark';
import gymIcon from '@iconify/icons-map/gym';
import commentBubble from '@iconify/icons-cil/comment-bubble';
import client from '../apollo';
import { SignedInContext } from '../App';

/* Component */
import EmptyMessage from './EmptyMessage';

/* Queries */
import { getAllPostsQuery } from '../queries/queries';
import { getMyProfileQuery } from '../queries/queries';

/* Mutations */
import { likePostMutation } from '../mutations/mutations';
import { deletePostMutation } from '../mutations/mutations';

const UserProfile = (props) => {
  const history = useHistory();

  const { updateSignIn } = useContext(SignedInContext);

  if (!Cookies.get('token')) {
    history.push('/signin');
  } else {
    updateSignIn(true);
  }

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });

  const deletePost = async (post) => {
    console.log('deleted');

    await client.mutate({
      variables: {
        id: post._id,
      },
      mutation: deletePostMutation,
      refetchQueries: () => [{ query: getMyProfileQuery }],
    });
  };

  const profileData = props.getMyProfileQuery;

  const getConnectedUserID = () => {
    if (profileData.loading) {
      return (<p>Loading...</p>);
    } if (!profileData.loading) {
      return profileData.myProfile._id;
    }
  };

  const userID = getConnectedUserID();

  const likePost = async (post) => {
    console.log('Liked post');

    await client.mutate({
      variables: {
        id: post._id,
      },
      mutation: likePostMutation,
      refetchQueries: () => [{ query: getAllPostsQuery }],
    });
  };

  const displayUserDetails = () => {
    if (profileData.loading) {
      return (<p>Loading...</p>);
    } if (!profileData.myProfile) {
      return (<p>No users have been loaded. Contact admin.</p>);
    }
    console.log('query', profileData.myProfile.following);
    return (
      <div className="user-info-and-stats">
        <div className="button-grid-container">
          <div className="top-grid anchor-img">
            <div className="grid-item item1">
              <div className="grid1-circle" />
              <Link to={`/userprofile/${profileData.myProfile._id}/following`}>
                <div className="item-text item-left">
                  <div>{profileData.myProfile.following.length}</div>
                  <div>Following</div>
                </div>
              </Link>
            </div>
            <div className="grid-item item2">
              <div className="grid2-circle" />
              <Link to={`/userprofile/${profileData.myProfile._id}/followers`}>
                <div className="item-text item-right">
                  <div>{profileData.myProfile.followers.length}</div>
                  <div>Followers</div>
                </div>
              </Link>
            </div>
            <Link to={`/userprofile/${profileData.myProfile._id}/edit`}>
              <img id="profile-picture" src={profileData.myProfile.img} alt="user_image" />
              <div className="img-overlay" />
            </Link>
            <div className="circle-white" />
          </div>

          <div className="bottom-grid">
            <div className="grid-item item3">
              <div className="grid3-circle" />
              <div className="item-text item-left">
                <div>
                  {profileData.myProfile.height}
                  {' '}
                  |
                    {' '}
                  {profileData.myProfile.age}
                  {' '}
                </div>
                <div>height | age </div>
              </div>
            </div>
            <div className="grid-item item4">
              <div className="plus-icon">
                <Icon icon={plusCircleFill} />
              </div>
              <div className="grid4-circle" />
              <Link to={`/userprofile/${profileData.myProfile._id}/edit`}>
                <div id="edit-button" className="item-text item-right">
                  <div>Edit </div>
                  <div>profile</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="description">
          <p>
            <strong>{profileData.myProfile.username}</strong>
            {' '}
          </p>
          <p>{profileData.myProfile.description}</p>
        </div>

        {profileData.myProfile.posts.length > 0
          ? profileData.myProfile.posts.map((post) => (

            <div className="post" key={post._id}>

              <div className="user-details">
                <img className="profil-avatar" src={profileData.myProfile.img} alt="" />
                <p>{profileData.myProfile.username}</p>
              </div>

              <img className="post-img" src={post.img} alt="post_image" />
              <div className="under-img">
                <div className="post-icons-in-profile">

                  <div className="icon-left">
                      <div className={post.likes.includes(userID) ? 'powerBlue dumbell' : 'dumbell'} onClick={() => likePost(post)}>

                        <Icon icon={gymIcon} />
                      </div>
                      <div>
                        <Icon icon={commentBubble} />
                      </div>
                    </div>

                  <div className="icon-right">
                      <p onClick={() => deletePost(post)}><Icon icon={crossMark} /></p>
                    </div>

                </div>
                <div className="post-details">
                  <p>{post.likes.length > 0 ? `${post.likes.length} like(s)` : 'No likes yet'}</p>
                  <p>
                      <strong>{profileData.myProfile.username}</strong>
                      {' '}
                      {post.description}
                    </p>
                  <p className="comment-link">{post.comments.length > 0 ? 'view comments' : ''}</p>
                  {/* <p className="comment-link">View comments </p> */}
                  <p className="date">{moment.unix(post.timeStamp / 1000).format('LL')}</p>
                </div>
              </div>
            </div>
          ))
          : <EmptyMessage message="No posts added" entity="user-profile" />}
      </div>
    );
  };

  return (
    <div>
      {displayUserDetails()}
    </div>
  );
};

export default compose(
  graphql(getAllPostsQuery, { name: 'getAllPostsQuery' }),
  graphql(getMyProfileQuery, { name: 'getMyProfileQuery' }),
)(UserProfile);
