import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

/* Queries */
import { getAllPostsQuery } from '../queries/queries';

const ExploreContent = (props) => {

    let postData = props.getAllPostsQuery;

    const displayExploreContent = () => {
        if (postData.loading) {
            return (<p>Loading...</p>)
        } else if (postData.posts) {
            return (

                <div className="row">
                    <p>Find other fitgrammer's journey's</p>
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
            {displayExploreContent()}
        </div>
    )
};

export default compose(
    graphql(getAllPostsQuery, { name: "getAllPostsQuery" })
)(ExploreContent);