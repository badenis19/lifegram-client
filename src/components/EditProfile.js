import React, { useContext, useEffect, useState } from 'react';
import { graphql } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SignedInContext } from "../App";
import { useForm } from "react-hook-form";
import client from '../apollo';

/* Queries */
import { getMyProfileQuery } from '../queries/queries';
import { getAllPostsQuery } from '../queries/queries';

/* Mutations */
import { editUserProfileMutation } from '../mutations/mutations';

// setting up the filestack client with API KEY
const clientFS = require('filestack-js').init(process.env.REACT_APP_FILESTACK_API_KEY);

const EditProfile = (props) => {

  let history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm();
  let { updateSignIn } = useContext(SignedInContext);
  let [imageUrl, setImageUrl] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAM1BMVEXU1tT8/vz////R1NH7+vvZ2tnh4eH49/jq6urn5ufv7u/z8fPS09Lk4+Tf3t/c3Nzy9PLFcvhgAAADGklEQVR4nO2a2XKrMBBEjVaQWfz/X3uR4zjGCWjpHpKqq/PEG12zSZqZy6XRaDQajUaj0fgf0CsXuyzjRY/r1+m/X/89BG8inTE+DM5ezpQx2j4Y1W0x196OZymY/bf/P1T4yZ5ginG+/fj7B34S94fbMcATZSZRATYc//+DYMUEjM7kKFiZpOKyzxSweiPIKLgmomCj4SrhjBIFK15AQZGAqIFth0IbCNghlCvgxqQecrNxS88rlLZOQadmmoTiUPyEFZJ6qAiEhxlIrlgq3XBnoUjIOpr2oGQFZIROEcygISOsZsCjoTYhn+BmmEAFXQ9LAP1AOCpgP3QKLU+uuiw9JYDXWTQfImhOVB8PL2AKrCdIwNJyJijoHCQBrgoraoAk1J/TL2DFaSAoACXkP6AOwA7sJiHyF2Lh9zPiD9QFR5DQYRIWhgTwTUVQYLA7iyYc1h5rPGlCVqKPugW/uMHPa/jOYlAFeInGX5VwWuJtjhH0BJgPd7CXhMIujg8Om/9JIzAUYOfEROn0IC8qT2r7AUnBaTUBLTc10HqfuqIDHbkxx1RVWcHtg9uaNjh3GqDn8m6LY08L50I7EFvgnxTawcwCE1Nd0vkyrILwhs2dzUjNCCOZN0nJkbFe0kVKXaWn9y5xhfGUC8IhejwSYdwovTugresPE8MEJze3jwZYQkYsmDBLmcIOPjcp/bAIrA/YPlfAhwj2HsXqgeJjSgWqJfqqx4TpWZYYpxIXbAzhORsl9ooMZgjbHHoCH3T4jlF5GL6DHZvaVl6dtxp8/bmlZ8ZMJlJ7jdTZm1RJKgOC0el6ovqK7NSUxuuXhqFYA9UGdw2hUAPZBncNZW9cYiR+YYo0UCak3zUUPLBkFBTtGDFq4s8acl0xSSnInhFhKzzHZL63GfsCu2R1Xtg16Y2MoxtfXkmQzgpRN0SSrpAoi28k3r2McViKRHHAR1FpEvOBE4zQdbdfjoTIgRnOiITIwbCops1bw35rWFN2NnLY3TmzJ/nh4OIgeURu2ctLxlZfLjueQIeiRfycE/ZEBTtjZOGLwpaXpYZ/IQAoGV+RzQwAAAAASUVORK5CYII=");
  // let [imageUrl, setImageUrl] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAM1BMVEXU1tT8/vz////R1NH7+vvZ2tnh4eH49/jq6urn5ufv7u/z8fPS09Lk4+Tf3t/c3Nzy9PLFcvhgAAADGklEQVR4nO2a2XKrMBBEjVaQWfz/X3uR4zjGCWjpHpKqq/PEG12zSZqZy6XRaDQajUaj0fgf0CsXuyzjRY/r1+m/X/89BG8inTE+DM5ezpQx2j4Y1W0x196OZymY/bf/P1T4yZ5ginG+/fj7B34S94fbMcATZSZRATYc//+DYMUEjM7kKFiZpOKyzxSweiPIKLgmomCj4SrhjBIFK15AQZGAqIFth0IbCNghlCvgxqQecrNxS88rlLZOQadmmoTiUPyEFZJ6qAiEhxlIrlgq3XBnoUjIOpr2oGQFZIROEcygISOsZsCjoTYhn+BmmEAFXQ9LAP1AOCpgP3QKLU+uuiw9JYDXWTQfImhOVB8PL2AKrCdIwNJyJijoHCQBrgoraoAk1J/TL2DFaSAoACXkP6AOwA7sJiHyF2Lh9zPiD9QFR5DQYRIWhgTwTUVQYLA7iyYc1h5rPGlCVqKPugW/uMHPa/jOYlAFeInGX5VwWuJtjhH0BJgPd7CXhMIujg8Om/9JIzAUYOfEROn0IC8qT2r7AUnBaTUBLTc10HqfuqIDHbkxx1RVWcHtg9uaNjh3GqDn8m6LY08L50I7EFvgnxTawcwCE1Nd0vkyrILwhs2dzUjNCCOZN0nJkbFe0kVKXaWn9y5xhfGUC8IhejwSYdwovTugresPE8MEJze3jwZYQkYsmDBLmcIOPjcp/bAIrA/YPlfAhwj2HsXqgeJjSgWqJfqqx4TpWZYYpxIXbAzhORsl9ooMZgjbHHoCH3T4jlF5GL6DHZvaVl6dtxp8/bmlZ8ZMJlJ7jdTZm1RJKgOC0el6ovqK7NSUxuuXhqFYA9UGdw2hUAPZBncNZW9cYiR+YYo0UCak3zUUPLBkFBTtGDFq4s8acl0xSSnInhFhKzzHZL63GfsCu2R1Xtg16Y2MoxtfXkmQzgpRN0SSrpAoi28k3r2McViKRHHAR1FpEvOBE4zQdbdfjoTIgRnOiITIwbCops1bw35rWFN2NnLY3TmzJ/nh4OIgeURu2ctLxlZfLjueQIeiRfycE/ZEBTtjZOGLwpaXpYZ/IQAoGV+RzQwAAAAASUVORK5CYII=");

  if (!Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(true);
  }

  // Callback options for fileStack upload
  const options = {
    fromSources: ["local_file_system", "webcam", "url", "instagram", "facebook"],
    accept: ["image/*", "video/*"],
    onUploadDone: file => {
      setImageUrl(file.filesUploaded[0].url) // to save url from upload
      // console.log(file.filesUploaded[0].url)
    }
  };

  const handleImageUpload = () => {
    // to open the widget for image upload
    clientFS.picker(options).open();
  };

  const onSubmit = async ({ username, email, password, age, img, description }) => {

    await client.mutate({
      variables: {
        username: username,
        email: email,
        password: password,
        img: imageUrl,
        age: Number(age),
        description: description
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

    reset(userDetailsToEdit)
  }, [])

  return (
    <div>
      <div className="sign-in-up-intro">
        <h3 >Edit your profile</h3>
        {/* <img src={image} alt=""/> */}
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
          <input type="password" placeholder="Password" name="password" ref={register({ required: true })} />
          {errors.password && (< p > This is required</p>)}
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    </div>

  )
};

export default graphql(getMyProfileQuery)(EditProfile);
