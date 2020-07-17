import React, { useEffect, useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import client from '../apollo';
import { useHistory } from 'react-router-dom';

/* Mutations */
import { createUserMutation } from "../mutations/mutations";

const Signup = () => {

  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  const createUser = async (e) => {
    console.log("creating user..");
    e.preventDefault();
    await client.mutate({
      variables: {
        username: username,
        email: email,
        password: password,
        age: Number(age)
      },
      mutation: createUserMutation
      // ,
      // refetchQueries: () => [{ query: getAllPostsQuery }] NO USER REFETCHING NEEDED FOR NOW. WILL REVIEW LATER OR REMOVE
    });
    history.push('/userprofile'); // TO MODIFY TO LOGGED IN USER SESSION userprofile

  }

  return (
    <div>
      <h3>Sign up now to share and see your friend's best life moments!</h3>
      {/* <form onSubmit={(e) => createUser(e)}> */}
      <form action="http://localhost:4001/sign" method="POST">
        <label htmlFor="user-name">Username:&nbsp;</label>
        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter your username" name="username" /><br />
        <label htmlFor="email">Email:&nbsp;</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" name="email" /><br />
        <label htmlFor="password">Password:&nbsp;</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" name="password" /><br />
        <label htmlFor="age">Age:&nbsp;</label>
        <input type="number" onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" name="age" /><br />
        <button>Log in</button>
      </form>
    </div>
  )
}

export default compose(
  graphql(createUserMutation, { name: "createUserMutation" }),
)(Signup);
