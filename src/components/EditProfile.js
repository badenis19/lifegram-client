import React, { useContext, useEffect } from 'react';
import { graphql } from 'react-apollo';
// import UserForm from './UserForm';
import { useHistory } from 'react-router-dom';
import { getMyProfileQuery } from '../queries/queries';
import Cookies from 'js-cookie';
import { SignedInContext } from "../App";
import { useForm } from "react-hook-form";
// Connected user data

const EditProfile = (props) => {

  let history = useHistory();

  // let [preloadedValues, setPreloadedValues] = useState("");

  // const { register, handleSubmit, errors } = useForm({
  //   defaultValues: preloadedValues
  // });

  const { register, handleSubmit, errors, reset } = useForm();

  let { updateSignIn } = useContext(SignedInContext);

  if (!Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(true);
  }

  const onSubmit = () => {
    console.log("ok");
  }

  let data = props.data;
  console.log(data)

  useEffect(() => {

    const fetchUserData = () => {
      // return (<p>Loading...</p>)
      if (data.loading) {
        console.log("loading")
        return (<p>Loading...</p>)
      } else if (data.myProfile) {
        console.log("ok")
        console.log(data.myProfile)
        return data.myProfile
      } else {
        return (<p>There are no posts...</p>)
        // console.log("There are no posts...")
      }
    }

     let userDetailsToEdit = fetchUserData();
    //  console.log(userDetailsToEdit)

      reset(userDetailsToEdit)
  },[reset])

  // useEffect(async () => {
  //   const result = await fetch('./api/formValues.json'); // result: { firstName: 'test', lastName: 'test2' }
  //   reset(result); // asynchronously reset your form values
  // }, [reset])


  return (
    <div>
      <div className="sign-in-up-intro">
        <h3>Edit your profile</h3>
      </div>
      <form className="edit-user-form" onSubmit={handleSubmit(onSubmit)} >
        {errors.serverError && errors.serverError.message}

        <div className="change-img">
          {/* { preloadedValues &&  <img src= {preloadedValues.img} alt=""/>} */}
          <p >Change profile photo</p>
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
      {/* {fetchUserData()} */}
      {/* {displayForm()} */}
    </div>
  )
};

// export default EditProfile;
export default graphql(getMyProfileQuery)(EditProfile);
