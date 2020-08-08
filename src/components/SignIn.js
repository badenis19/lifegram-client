import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SignedInContext } from "../App";
import { useForm } from 'react-hook-form';

const SignIn = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  let { updateSignIn } = useContext(SignedInContext);

  if (Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(false);
  }

  // signin endpoint URL
  const url = "http://localhost:4001/signIn";

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const onSubmit = (data, e) => {
    // e.preventDefault();

    // const options = {
    //   method: 'post',
    //   headers: {
    //     'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //   },
    //   body: `email=${email}&password=${password}`
    // }

    // fetch() to make network request using promises (similar to XMLHttpRequest)
    fetch(url, {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `email=${data.email}&password=${data.password}`
    })
      .then(response => {
        console.log("---------", response)
        // if response not ok, return error messages else return response 
        if (!response.ok) {
          if (response.status === 404) {
            alert('Email not found, please retry')
          }
          if (response.status === 401) {
            alert('Email and password do not match, please retry')
          }
        }

        return response
      }) // from string to Json object
      .then(response => response.json())
      .then(data => {
        // if data.success (logged in) is true then store
        if (data.success) {
          document.cookie = 'token=' + data.token
          // redirect to user profile page
          history.push('/userprofile');
          // updating the context isSignedIn to false
          updateSignIn(true);
        }
      })
  }

  return (
    <div>
      <div className="sign-in-up-intro">
        <h3>Sign in</h3>
      </div>
      {/* <form onSubmit={(e) => submitForm(e)} >
        <label htmlFor="user-email">Email:&nbsp;</label>
        <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter your email." name="user-email" /><br />
        <label htmlFor="user-password">Password:&nbsp;</label>
        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter your password" name="user-password" /><br />
        <button>Sign in</button>
      </form>

      <p>------------------------------------------</p> */}

      <form className="signin-form" onSubmit={handleSubmit(onSubmit)} >
        <div>
          <input type="text" placeholder="Email" name="email" ref={register({ required: true })} />
          {errors.email && errors.email.type === 'required' && (< p > This is required</p>)}
          {errors.email && errors.email.type === 'pattern' && (< p > This is not a valid email address</p>)}
        </div>

        <div>
          <input type="password" placeholder="Password" name="password" ref={register({ required: true })} />
          {errors.password && (< p > This is required</p>)}
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>

      {/* <p>--------------------OR--------------------</p>

      <Link to="/signup">
        <button>Sign up</button>
      </Link> */}
    </div>
  )
}

export default SignIn;
