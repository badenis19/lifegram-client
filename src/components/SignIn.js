import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const SignIn = () => {

  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0)
  });

  // signin endpoint URL
  const url = "http://localhost:4001/signIn";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
   
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
      console.log(response)
        // if response not ok, return error messages else return response 
      if (!response.ok) {
        if (response.status === 404) {
          alert('Email not found, please retry')
        }
        if (response.status === 401) {
          alert('Email and password do not match, please retry')
        }
      }

      console.log("passed the response checks")

      return response
    }) // from string to Json object
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // if data.success (logged in) is true then store
      if (data.success) {
        document.cookie = 'token=' + data.token
        // redirect to private-area
        history.push('/userprofile');
      }
    })
  }

  return (
    <div>

      <h1>Welcome to LifeGram</h1>

      <form onSubmit={(e) => submitForm(e)} >
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
