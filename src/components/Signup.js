import React, { useEffect, useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import client from '../apollo';
import { useHistory } from 'react-router-dom';

/* Mutations */
import { createUserMutation } from "../mutations/mutations";

const Signup = (props) => {

  const [username, setUsername] = useState('?');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const createUser = async (e) => {
    console.log("creating user..");
    e.preventDefault();

    await client.mutate({
      variables: {
        username: username,
        email: email,
        password: password
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
      <form onSubmit={(e) => createUser(e)}>
        <label htmlFor="user-name">Username:&nbsp;</label>
        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter your username" name="user-name" /><br />
        <label htmlFor="user-email">Email:&nbsp;</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" name="user-email" /><br />
        <label htmlFor="user-password">Password:&nbsp;</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" name="user-password" /><br />
        <button>Log in</button>
      </form>
    </div>
  )
}

export default compose(
  graphql(createUserMutation, { name: "createUserMutation" }),
)(Signup);
