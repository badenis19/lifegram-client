import React, { useEffect, useState, useContext } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { SignedInContext } from '../App';

/* Mutations */
import { createUserMutation } from '../mutations/mutations';
// import { ColorspaceType } from 'filestack-js';

const Signup = () => {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const url = 'http://localhost:4001/sign';

  console.log('Message>>', message);
  const onSubmit = async (data, e) => {
    console.log(data);

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `username=${data.username}&email=${data.email}&password=${data.password}&age=${data.age}`,
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  };

  const history = useHistory();

  const { updateSignIn } = useContext(SignedInContext);

  if (Cookies.get('token')) {
    history.push('/userprofile');
  } else {
    updateSignIn(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <div className="sign-in-up-intro">
        <h3>Create your account</h3>
      </div>
      {message && <p className={message === 'User created succesfully' ? 'signup-created' : 'signup-failed'}>{message}</p>}
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        {errors.serverError && errors.serverError.message}
        <div>
          <input className="trial" id="username" type="text" placeholder="Username" name="username" ref={register({ required: true, maxLength: 15 })} />
          {errors.username && errors.username.type === 'required' && (<p> This is required</p>)}
          {errors.username && errors.username.type === 'maxLength' && (<p> This has a maximum length of 15</p>)}
        </div>

        <div>
          <input type="text" placeholder="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && errors.email.type === 'required' && (<p> This is required</p>)}
          {errors.email && errors.email.type === 'pattern' && (<p> This is not a valid email address</p>)}
        </div>

        <div>
          <input type="password" placeholder="Password" name="password" ref={register({ required: true })} />
          {errors.password && (<p> This is required</p>)}
        </div>

        <div>
          <input type="number" placeholder="Age" name="age" ref={register({ required: true, max: 999, min: 1 })} />
          {errors.age && errors.age.type === 'required' && (<p> This is required</p>)}
          {errors.age && errors.age.type === 'max' && (<p> surely your not 1000years old or over!</p>)}
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default compose(
  graphql(createUserMutation, { name: 'createUserMutation' }),
)(Signup);

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
