import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

/* Queries */
import { getAllPostsQuery } from '../queries/queries';

/* Mutations */
import { addPostMutation } from "../mutations/mutations"

const NewPost = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  });

  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");
  let userId = "5ef50e5a2af31853d8f4964a";

  console.log(">>", description)

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
        <label htmlFor="post-description">Description:&nbsp;</label>
        <input type="text" placeholder="Write a caption.." onChange={(e) => setDescription(e.target.value)} name="post-description" /><br />
        <label htmlFor="post-image">Book Name:&nbsp;</label>
        <input type="text" placeholder="Enter image URL" onChange={(e) => setImage(e.target.value)} name="post-image" /><br />
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
