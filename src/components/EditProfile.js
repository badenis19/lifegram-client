import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import UserForm from './UserForm';
import { getMyProfileQuery } from '../queries/queries';

// Connected user data

const EditProfile = (props) => {

  const [userData, setUserData] = useState("")

  // console.log(props.data.myProfile)
  // extracting id from props (params)
  // const { id } = props.match.params;
  // useEffect(() => {
  //   if(!props.userData){
  //     setuserData(props.data.myProfile)
  //     console.log("nuono")
  //   }
  // },[])

  let data = props.data;
  console.log(data)

  const displayForm = () => {
    if (data.loading) {
      return (<p>Loading...</p>)
    } else if (!data.myProfile) {
      return (<p>No users have been loaded. Contact admin.</p>)
    } else if (!data.loading) {
      return (
        <div>
          <p>okokok</p>
          <UserForm preloadedValues={data.myProfile} /> 
          {/* {userData ? <UserForm preloadedValues={userData} /> : <div>Loading...</div>} */}
        </div>
      )
    }
  }

  

  // const data = {
  // username: "a",
  // email: "b",
  // password: "c",
  // age: 23
  // }

  return (
    <div>
      <h1>EditProfile</h1>
      {displayForm()}
    </div>
  )
};

// export default EditProfile;
export default graphql(getMyProfileQuery)(EditProfile);
