import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';


/* Queries */
import { getAllPostsQuery } from '../queries/queries';

/* Mutations */
import { addPostMutation } from "../mutations/mutations";

const client = require('filestack-js').init('ADK13G1OuTrawWRBsxxAOz');

const NewPost = (props) => {

  let [description, setDescription] = useState("");
  let [imageUrl, setImageUrl] = useState("");
  let userId = "5ef50e5a2af31853d8f4964a";

  const options = {
    onUploadDone: file => {
      setImageUrl(file.filesUploaded[0].url)
    }
  };

  const handleImageUpload = () => {
    client.picker(options).open();
  };

  const submitForm = (e) => {
    console.log("running....");
    e.preventDefault();
    props.addPostMutation({ // addPostMutation refers to addPostMutation name (key) in the compose function at bottom of the page
      variables: {
        description: description,
        img: imageUrl,
        userId: userId
      },
      refetchQueries: [{ query: getAllPostsQuery }]
    })
  }

  return (
    <div className="share-form" onSubmit={(e) => submitForm(e)}>
      <form action="">
        <label htmlFor="post-descriptio">Description:&nbsp;</label>
        <input type="text" placeholder="Write a caption.." onChange={(e) => setDescription(e.target.value)} name="post-description" /><br />
        {
          imageUrl ?
            <img src={imageUrl} alt="" />
            :
            ""
        }
      <p onClick={() => handleImageUpload()}>Widget</p>
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
