import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Icon } from '@iconify/react';
import gymIcon from '@iconify/icons-map/gym';
import commentBubble from '@iconify/icons-cil/comment-bubble';
import client from '../apollo';
import { SignedInContext } from '../App';

/* Queries */
import { getAllPostsQuery } from '../queries/queries';
import { getMyProfileQuery } from '../queries/queries';

/* Mutations */
import { likePostMutation } from '../mutations/mutations';
import EmptyMessage from './EmptyMessage';

const PostsFeed = (props) => {
  const history = useHistory();

  const { updateSignIn } = useContext(SignedInContext);

  if (!Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(true);
  }

  // useEffect(() => {
  //   window.scrollTo(0, 0);

  // });

  const postData = props.getAllPostsQuery;
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
    console.log('Liked post', post);

    await client.mutate({
      variables: {
        id: post._id,
      },
      mutation: likePostMutation,
      refetchQueries: () => [{ query: getAllPostsQuery }],
    });
  };

  const getConnectedUserFollowingArray = () => {
    if (profileData.loading) {
      return (<p>Loading...</p>);
    } if (!profileData.loading) {
      return profileData.myProfile.following;
    }
  };

  // following array from currently connected user
  const followingArray = getConnectedUserFollowingArray();

  const displayAllPosts = () => {
    if (postData.loading) {
      return (<p>Loading...</p>);
    } if (followingArray.length > 0) {
      return (
        <div>
          {postData.posts.filter((post) => followingArray.includes(post.user._id)).sort((a, b) => b.timeStamp - a.timeStamp).map((post) => (
            <div className="post" key={post._id}>
              <div className="user-details">
                <img className="profil-avatar" src={post.user.img} alt="" />
                <div><p>{post.user.username}</p></div>
              </div>
              <img className="post-img" src={post.img} alt="post_image" />
              <div className="under-img">
                <div className="icon-left">
                  <div className={post.likes.includes(userID) ? 'powerBlue dumbell' : 'dumbell'} onClick={() => likePost(post)}>
                    <Icon icon={gymIcon} />
                  </div>
                  <div>
                    <Icon icon={commentBubble} />
                  </div>
                </div>
                <div className="post-details">
                  <p>{post.likes.length > 0 ? `${post.likes.length} like(s)` : 'No likes yet'}</p>
                  <p>
                    <strong>{post.user.username}</strong>
                    {' '}
                    {post.description}
                  </p>
                  <p className="comment-link">{post.comments.length > 0 ? 'view comments' : ''}</p>
                  {/* <p className="comment-link">View comments </p> */}
                  <p className="date">{moment.unix(post.timeStamp / 1000).format('LL')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return <EmptyMessage message="No posts yet." entity="post-feed" />;
  };

  return (
    <div className="main">
      {displayAllPosts()}
    </div>
  );
};

export default compose(
  graphql(getAllPostsQuery, { name: 'getAllPostsQuery' }),
  graphql(getMyProfileQuery, { name: 'getMyProfileQuery' }),
)(PostsFeed);
