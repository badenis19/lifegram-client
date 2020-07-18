import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

/* Mutations */
import { createUserMutation } from "../mutations/mutations";

const Signup = () => {
  
  let history = useHistory();

  if (Cookies.get('token')) {
    history.push('/userprofile');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // const refreshPage = () => {
  //   window.location.reload(false);
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   refreshPage();
  // }

  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [age, setAge] = useState('');

  // not used at the moment, using express endpoint to create user (to use later)
  // const createUser = async (e) => {
  //   console.log("creating user..");
  //   e.preventDefault();
  //   await client.mutate({
  //     variables: {
  //       username: username,
  //       email: email,
  //       password: password,
  //       age: Number(age)
  //     },
  //     mutation: createUserMutation
  //     // ,
  //     // refetchQueries: () => [{ query: getAllPostsQuery }] NO USER REFETCHING NEEDED FOR NOW. WILL REVIEW LATER OR REMOVE
  //   });
  // //   history.push('/userprofile'); // TO MODIFY TO LOGGED IN USER SESSION userprofile
  // }

  return (
    <div>
      <h3>Sign up now to share and see your friend's best life moments!</h3>
      <form action="http://localhost:4001/sign" method="POST">
        <label htmlFor="user-name">Username:&nbsp;</label>
        <input type="text" placeholder="Enter your username" name="username" /><br />
        <label htmlFor="email">Email:&nbsp;</label>
        <input type="text" placeholder="Enter your email" name="email" /><br />
        <label htmlFor="password">Password:&nbsp;</label>
        <input type="password" placeholder="Enter your password" name="password" /><br />
        <label htmlFor="age">Age:&nbsp;</label>
        <input type="number" placeholder="Enter your age" name="age" /><br />
        <button>Sign up</button>
      </form>
    </div>
  )
}

export default compose(
  graphql(createUserMutation, { name: "createUserMutation" }),
)(Signup);
