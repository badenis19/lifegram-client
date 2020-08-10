import React from 'react';
import UserForm from './UserForm';
// import { Link } from 'react-router-dom';

// Connected user data

const EditProfile = (props) => {

  console.log(props)
  // extracting id from props (params)
  // const { id } = props.match.params;

  const data = {
    username: "a",
    email: "b",
    password: "c",
    age: 23
  }

  return (
    <div>
      <h1>EditProfile</h1>
      {data ? <UserForm preloadedValues={data} /> : <div>Loading...</div>}
    </div>
  )
};

export default EditProfile;
