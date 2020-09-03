import React, { useContext } from 'react';
import moment from 'moment';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { SignedInContext } from "../App";
import client from '../apollo';
import { Icon } from '@iconify/react';
import gymIcon from '@iconify/icons-map/gym';
import commentBubble from '@iconify/icons-cil/comment-bubble';

/* Queries */
import { getAllPostsQuery } from '../queries/queries';
import { getMyProfileQuery } from '../queries/queries';

/* Mutations */
import { likePostMutation } from '../mutations/mutations';

const ExploreContent = (props) => {



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


    const displayAllPosts = () => {
        if (postData.loading) {
            return (<p>Loading...</p>)
        } else if (postData.posts) {
            return (
                <div className="row">
                    <div className=" grid-container explore-container">
                        {postData.posts.map((post) => {
                            return (
                                <div className="post-card" key={post._id}>

                                    <div className="wrapper">
                                        <img className="post-img" src={post.img} alt="post_image" />



                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return (<p>There are no posts...</p>)
        }
    }

    return (
        <div className="main">
            {displayAllPosts()}
        </div>
    )
};

// export default ExploreContent;

export default compose(
    graphql(getAllPostsQuery, { name: "getAllPostsQuery" })
)(ExploreContent);