import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash'; 

/* Queries */
import { getAllPostsQuery } from '../queries/queries';

/* Mutations */
import { addPostMutation } from "../mutations/mutations"

const NewPost = (props) => {

  let [description, setDescription] = useState("At the beach");
  let [image, setImage] = useState("PPPPP");
  let userId = "5ef50e5a2af31853d8f4964a";

  const submitForm = (e) => {
    console.log("running....");
    e.preventDefault();
    props.addPostMutation({ // addPostMutation refers to addPostMutation name (key) in the compose function at bottom of the page
      variables: {
        description: description,
        img: image,
        userId: userId
      },
      refetchQueries: [{ query: getAllPostsQuery }]
    })
  }

    return (
      <div className="share-form" onSubmit={(e) => submitForm(e)}>
        <form action="">
          <input type="text" placeholder="Write a caption.." name="post-description" /><br />
          <button>Share</button>
        </form>
      </div>

    )
  }

  export default compose(
    graphql(addPostMutation, { name: "addPostMutation" }),
    graphql(getAllPostsQuery, { name: "getAllPostsQuery" })
  )(NewPost);

  // export default graphql(addPostMutation)(NewPost);
