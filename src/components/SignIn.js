import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { navigate } from '@reach/router'

const SignIn = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  });

  const url = "http://localhost:3000/signin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.prevenDefault();
    console.log("submit");

    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `email=${email}&password=${password}`
    }

    // fetch() to make network request using promises (similar to XMLHttpRequest)
    fetch(url, options)
    .then(response => {
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
      // if data.success is true add the token to the cookies
      if (data.success) {
        document.cookie = 'token=' + data.token
        // redirect to private-area
        navigate('/private-area')
      }
    })
  }

  return (
    <div>
      <h1>Welcome to LifeGram</h1>
      <form onSubmit={(e) => submitForm(e)}>
        <label htmlFor="user-email">Email:&nbsp;</label>
        <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter your email." name="user-email" /><br />
        <label htmlFor="user-password">Password:&nbsp;</label>
        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter your password" name="user-password" /><br />
        <button>Sign in</button>
      </form>
      <p>--------------------OR--------------------</p>
      <Link to="/signup">
        <button>Sign up</button>
      </Link>
    </div>
  )
}

export default SignIn;
