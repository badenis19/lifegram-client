import React from 'react';
import UserForm from './UserForm';
// import { Link } from 'react-router-dom';

// Connected user data

const EditProfile = (props) => {

  console.log(props)
  // extracting id from props (params)
  const { id } = props.match.params

  return (
    <div>
      <h1>EditProfile</h1>
      {data ? <UserForm preloadedValues={data} /> : <div>Loading...</div>}
    </div>
  )
};

export default EditProfile;
