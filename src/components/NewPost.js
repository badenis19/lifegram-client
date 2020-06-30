import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

/* Queries */
import { getAllPostsQuery } from '../queries/queries';

/* Mutations */
import { addPostMutation } from "../mutations/mutations";

// require("dotenv/config");
// require('dotenv').config();

// setting up the filestack client with API KEY
const client = require('filestack-js').init('ADK13G1OuTrawWRBsxxAOz');
// const client = require('filestack-js').init(process.env.FILESTACK_API_KEY);


const NewPost = (props) => {

  let [description, setDescription] = useState("");
  let [imageUrl, setImageUrl] = useState("");
  let userId = "5ef50e5a2af31853d8f4964a";

  // To refresh page after submitting the form
  const refreshPage = () => {
    window.location.reload(false);
  };

  // Callback options for fileStack upload
  const options = {
    onUploadDone: file => {
      setImageUrl(file.filesUploaded[0].url) // to save url from upload
    }
  };

  const handleImageUpload = () => {
    // to open the widget for image upload
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
    });
    console.log("refreshing page..");
    refreshPage();
  }

  return (
    <div className="share-form" onSubmit={(e) => submitForm(e)}>
      <form action="">
        <label htmlFor="post-description">Description:&nbsp;</label>
        <input type="text" placeholder="Write a caption.." onChange={(e) => setDescription(e.target.value)} name="post-description" /><br />
        {
          imageUrl ?
            <img src={imageUrl} alt="" />
            :
            ""
        }
        <p className="image-upload-btn" onClick={() => handleImageUpload()}>Upload</p>
        <button>Share</button>
      </form>
    </div>

  )
}

export default compose(
  graphql(addPostMutation, { name: "addPostMutation" }),
  graphql(getAllPostsQuery, { name: "getAllPostsQuery" })
)(NewPost);
