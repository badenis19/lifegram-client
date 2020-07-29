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

  const formRef = React.useRef();
  const url = "http://localhost:4001/sign"

  const onSubmit = (data, e) => {
    formRef.current.submit();
    e.target.reset();

  }

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

  return (
    <div>
      <div className="signup-intro">
        <h3>Create your account</h3>
      </div>
      <form className="signup-form" ref={formRef} action={url} method="POST" onSubmit={handleSubmit(onSubmit)} >
        <div>
          {/* <label htmlFor="username">Username:</label> */}
          <input className="trial" id="username" type="text" placeholder="Username" name="username" ref={register({ required: true, maxLength: 15 })} />
          {errors.username && errors.username.type === 'required' && (< p > This is required</p>)}
          {errors.username && errors.username.type === 'maxLength' && (< p > This has a maximum length of 15</p>)}
        </div>

        <div>
          {/* <label htmlFor="email">Email:&nbsp;</label> */}
          <input type="text" placeholder="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && errors.email.type === 'required' && (< p > This is required</p>)}
          {errors.email && errors.email.type === 'pattern' && (< p > This is not a valid email address</p>)}
        </div>

        <div>
          {/* <label htmlFor="password">Password:&nbsp;</label> */}
          <input type="password" placeholder="Password" name="password" ref={register({ required: true })} />
          {errors.password && (< p > This is required</p>)}
        </div>

        <div>
          {/* <label htmlFor="age">Age:&nbsp;</label> */}
          <input type="number" placeholder="Age" name="age" ref={register({ required: true, max: 999, min: 1 })} />
          {errors.age && errors.age.type === 'required' && (< p > This is required</p>)}
          {errors.age && errors.age.type === 'max' && (< p > surely your not 1000years old or over!</p>)}
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    </div >
  )
}

export default compose(
  graphql(createUserMutation, { name: "createUserMutation" }),
)(Signup);
