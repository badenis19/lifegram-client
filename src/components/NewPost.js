import React, { useState, useEffect, useContext } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import client from '../apollo';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SignedInContext } from "../App";

/* Queries */
import { getAllPostsQuery } from '../queries/queries';

/* Mutations */
import { createPostMutation } from "../mutations/mutations";

// setting up the filestack client with API KEY
const clientFS = require('filestack-js').init(process.env.REACT_APP_FILESTACK_API_KEY);

const NewPost = () => {

  let history = useHistory();

  let { isSignedIn, updateSignIn } = useContext(SignedInContext);
  
  if (!Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  });

  let [description, setDescription] = useState("");
  let [imageUrl, setImageUrl] = useState("");

  // To refresh page after submitting the form
  const refreshPage = () => {
    window.location.reload(false);
  };

  // Callback options for fileStack upload
  const options = {
    fromSources: ["local_file_system", "webcam", "url", "instagram", "facebook"],
    accept: ["image/*", "video/*"],
    onUploadDone: file => {
      setImageUrl(file.filesUploaded[0].url) // to save url from upload
    }
  };

  const handleImageUpload = () => {
    // to open the widget for image upload
    clientFS.picker(options).open();
  };

  const submitForm = async (e) => {
    console.log("running....");
    e.preventDefault();

    await client.mutate({
      variables: {
        description: description,
        img: imageUrl
      },
      mutation: createPostMutation,
      refetchQueries: () => [{ query: getAllPostsQuery }]
    });
    refreshPage();
  }

  return (
    <div >
      <form className="share-form" onSubmit={(e) => submitForm(e)}>
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
};

export default compose(
  graphql(createPostMutation, { name: "createPostMutation" }),
  graphql(getAllPostsQuery, { name: "getAllPostsQuery" })
)(NewPost);
