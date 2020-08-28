import React, { useContext, useEffect, useState } from 'react';
import { graphql } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SignedInContext } from "../App";
import { useForm } from "react-hook-form";
import client from '../apollo';
import Modal from "./Modal";

/* Queries */
import { getMyProfileQuery } from '../queries/queries';
import { getAllPostsQuery } from '../queries/queries';

/* Mutations */
import { editUserProfileMutation } from '../mutations/mutations';

// setting up the filestack client with API KEY
const clientFS = require('filestack-js').init(process.env.REACT_APP_FILESTACK_API_KEY);

const EditProfile = (props) => {

  let [show, setShow] = useState(false);
  let history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm();
  let { updateSignIn } = useContext(SignedInContext);
  let [imageUrl, setImageUrl] = useState("");


  if (!Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(true);
  }

  const options = {
    fromSources: ["local_file_system", "webcam", "url", "instagram", "facebook"],
    accept: ["image/*", "video/*"],
    onUploadDone: file => {
      setImageUrl(file.filesUploaded[0].url);
    }
  };

  const handleImageUpload = () => {
    // to open the widget for image upload
    clientFS.picker(options).open();
  };

  let showModal = () => {
    setShow(true);
    document.body.style.overflow = 'hidden';
  };

  let hideModal = () => {
    setShow(false);
    document.body.style.overflow = "unset";
  };

  const onSubmit = async ({ username, email, password, age, description, height, weight }) => {

    await client.mutate({
      variables: {
        username: username,
        email: email,
        // password: password,
        img: imageUrl,
        age: Number(age),
        description: description,
        height: height,
        weight: weight
      },
      mutation: editUserProfileMutation,
      refetchQueries: () => [{ query: getMyProfileQuery }, { query: getAllPostsQuery }]
    });
  }

  let data = props.data;

  useEffect(() => {

    const fetchUserData = () => {
      if (data.loading) {
        console.log("loading")
      } else if (data.myProfile) {
        return data.myProfile
      } else {
        console.log("Error, please contact the admin.")
      }
    }

    let userDetailsToEdit = fetchUserData();

    reset(userDetailsToEdit);

    setImageUrl(userDetailsToEdit.img);

  }, [])

  return (
    <div>
      <Modal
        show={show}
        hideModal={hideModal} />
      <div className="edit-user-form-top">
        <img className="profil-avatar" src={imageUrl} alt="" />
      </div>
      <form className="edit-user-form" onSubmit={handleSubmit(onSubmit)} >
        {errors.serverError && errors.serverError.message}

        <div className="change-img">
          <p onClick={() => handleImageUpload()}>Change profile photo</p>
        </div>

        <div>
          <input className="trial" id="username" type="text" placeholder="Username" name="username" ref={register({ required: true, maxLength: 15 })} />
          {errors.username && errors.username.type === 'required' && (< p > This is required</p>)}
          {errors.username && errors.username.type === 'maxLength' && (< p > This has a maximum length of 15</p>)}
        </div>

        <div>
          <input type="text" placeholder="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && errors.email.type === 'required' && (< p > This is required</p>)}
          {errors.email && errors.email.type === 'pattern' && (< p > This is not a valid email address</p>)}
        </div>

        <div>
          <input type="number" placeholder="Age" name="age" ref={register({ required: true, max: 999, min: 1 })} />
          {errors.age && errors.age.type === 'required' && (< p > This is required</p>)}
          {errors.age && errors.age.type === 'max' && (< p > surely your not 1000years old or over!</p>)}
        </div>

        <div>
          <input className="trial" id="description" type="text" placeholder="Description" name="description" ref={register({ maxLength: 50 })} />
          {errors.description && errors.description.type === 'required' && (< p > This is required</p>)}
          {errors.description && errors.description.type === 'maxLength' && (< p > This has a maximum length of 15</p>)}
        </div>

        <div>
          <input className="trial" id="weight" type="text" placeholder="Weight (e.g. 95kg)" name="weight" ref={register({ maxLength: 6 })} />
          {errors.weight && errors.weight.type === 'required' && (< p > This is required</p>)}
          {errors.weight && errors.weight.type === 'maxLength' && (< p > This has a maximum length of 6</p>)}
        </div>

        <div>
          <input className="trial" id="height" type="text" placeholder="Height (e.g. 1m62)" name="height" ref={register({ maxLength: 6 })} />
          {errors.height && errors.height.type === 'required' && (< p > This is required</p>)}
          {errors.height && errors.height.type === 'maxLength' && (< p > This has a maximum length of 6</p>)}
        </div>

        <button className="custom-btn btn-pass" onClick={() => showModal()}>
          Change Password
        </button>

        {/* <div>
          <input type="password" placeholder="Password" name="password" ref={register({ required: true })} />
          {errors.password && (< p > This is required</p>)}
        </div> */}

        <div>
          <input className="custom-btn btn-submit" type="submit" />
        </div>
      </form>
    </div>

  )
};

export default graphql(getMyProfileQuery)(EditProfile);
