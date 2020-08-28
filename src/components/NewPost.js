import React, { useState, useEffect, useContext } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import client from '../apollo';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SignedInContext } from "../App";
import { Icon } from '@iconify/react';
import plusCircleFill from '@iconify/icons-bi/plus-circle-fill';

/* Queries */
import { getAllPostsQuery } from '../queries/queries';

/* Mutations */
import { createPostMutation } from "../mutations/mutations";

// setting up the filestack client with API KEY
const clientFS = require('filestack-js').init(process.env.REACT_APP_FILESTACK_API_KEY);

const NewPost = () => {

  let history = useHistory();

  let { updateSignIn } = useContext(SignedInContext);

  if (!Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  });

  let [description, setDescription] = useState("");
  let [imageUrl, setImageUrl] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAM1BMVEXU1tT8/vz////R1NH7+vvZ2tnh4eH49/jq6urn5ufv7u/z8fPS09Lk4+Tf3t/c3Nzy9PLFcvhgAAADGklEQVR4nO2a2XKrMBBEjVaQWfz/X3uR4zjGCWjpHpKqq/PEG12zSZqZy6XRaDQajUaj0fgf0CsXuyzjRY/r1+m/X/89BG8inTE+DM5ezpQx2j4Y1W0x196OZymY/bf/P1T4yZ5ginG+/fj7B34S94fbMcATZSZRATYc//+DYMUEjM7kKFiZpOKyzxSweiPIKLgmomCj4SrhjBIFK15AQZGAqIFth0IbCNghlCvgxqQecrNxS88rlLZOQadmmoTiUPyEFZJ6qAiEhxlIrlgq3XBnoUjIOpr2oGQFZIROEcygISOsZsCjoTYhn+BmmEAFXQ9LAP1AOCpgP3QKLU+uuiw9JYDXWTQfImhOVB8PL2AKrCdIwNJyJijoHCQBrgoraoAk1J/TL2DFaSAoACXkP6AOwA7sJiHyF2Lh9zPiD9QFR5DQYRIWhgTwTUVQYLA7iyYc1h5rPGlCVqKPugW/uMHPa/jOYlAFeInGX5VwWuJtjhH0BJgPd7CXhMIujg8Om/9JIzAUYOfEROn0IC8qT2r7AUnBaTUBLTc10HqfuqIDHbkxx1RVWcHtg9uaNjh3GqDn8m6LY08L50I7EFvgnxTawcwCE1Nd0vkyrILwhs2dzUjNCCOZN0nJkbFe0kVKXaWn9y5xhfGUC8IhejwSYdwovTugresPE8MEJze3jwZYQkYsmDBLmcIOPjcp/bAIrA/YPlfAhwj2HsXqgeJjSgWqJfqqx4TpWZYYpxIXbAzhORsl9ooMZgjbHHoCH3T4jlF5GL6DHZvaVl6dtxp8/bmlZ8ZMJlJ7jdTZm1RJKgOC0el6ovqK7NSUxuuXhqFYA9UGdw2hUAPZBncNZW9cYiR+YYo0UCak3zUUPLBkFBTtGDFq4s8acl0xSSnInhFhKzzHZL63GfsCu2R1Xtg16Y2MoxtfXkmQzgpRN0SSrpAoi28k3r2McViKRHHAR1FpEvOBE4zQdbdfjoTIgRnOiITIwbCops1bw35rWFN2NnLY3TmzJ/nh4OIgeURu2ctLxlZfLjueQIeiRfycE/ZEBTtjZOGLwpaXpYZ/IQAoGV+RzQwAAAAASUVORK5CYII=");

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
    },
    transformations: {
      crop: true,
      circle: false,
      rotate: false
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
    <div className="new-post-container" >
      <h2>New Post</h2>
      <form className="share-form" onSubmit={(e) => submitForm(e)}>
        <div className="image-upload-btn" onClick={() => handleImageUpload()}><Icon icon={plusCircleFill} /></div>
        <input className="new-post-desc" type="text" placeholder="Write a caption.." onChange={(e) => setDescription(e.target.value)} name="post-description" />
        {
          imageUrl ?
            <img className="display-none" src={imageUrl} alt="" />
            :
            ""
        }
        <button>Share</button>
      </form>
    </div>
  )
};

export default compose(
  graphql(createPostMutation, { name: "createPostMutation" }),
  graphql(getAllPostsQuery, { name: "getAllPostsQuery" })
)(NewPost);
