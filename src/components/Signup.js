import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

// npm install react-hook-form
import { useForm } from 'react-hook-form';

/* Mutations */
import { createUserMutation } from "../mutations/mutations";

const Signup = () => {

  //React-hook-form
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log("data", data);
  console.log("error/s", errors);

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
  //   e.target.reset();
  //   // refreshPage();
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

  // return (
  //   <div>
  //     <h3>Sign up now to share and see your friend's best life moments!</h3>
  //     <form action="http://localhost:4001/sign" method="POST">
  //       <label htmlFor="user-name">Username:&nbsp;</label>
  //       <input type="text" placeholder="Enter your username" name="username" /><br />
  //       <label htmlFor="email">Email:&nbsp;</label>
  //       <input type="text" placeholder="Enter your email" name="email" /><br />
  //       <label htmlFor="password">Password:&nbsp;</label>
  //       <input type="password" placeholder="Enter your password" name="password" /><br />
  //       <label htmlFor="age">Age:&nbsp;</label>
  //       <input type="number" placeholder="Enter your age" name="age" /><br />
  //       <button>Sign up</button>
  //     </form>
  //   </div>
  // )
  return (
    <div>
      <h3>Sign up now to share and see your friend's best life moments!</h3>
      <form className="signup-form" action="http://localhost:4001/sign" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Username" name="Username" ref={register({ required: true, maxLength: 15 })} />
        {errors.Username && errors.Username.type === 'required' && (< p > This is required</p>)}
        {errors.Username && errors.Username.type === 'maxLength' && (< p > This has a maximum length of 15</p>)}



        <input type="text" placeholder="Email" name="Email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
        {errors.Email && errors.Email.type === 'required' && (< p > This is required</p>)}
        {errors.Email && errors.Email.type === 'pattern' && (< p > This is not a valid email address</p>)}

        <input type="password" placeholder="Password" name="Password" ref={register({ required: true })} />
        {errors.Password && (< p > This is required</p>)}

        <input type="number" placeholder="Age" name="Age" ref={register({ required: true, max: 999, min: 1 })} />
        {errors.Age && errors.Age.type === 'required' && (< p > This is required</p>)}
        {errors.Age && errors.Age.type === 'max' && (< p > surely your not 1000years old or over!</p>)}

        <input type="submit" />
      </form>
    </div >
  )
}

export default compose(
  graphql(createUserMutation, { name: "createUserMutation" }),
)(Signup);
