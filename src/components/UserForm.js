import React from 'react';
// import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const UserForm = ({ preloadedValues }) => {

  const { register, handleSubmit } = useForm({
    defaultValues: preloadedValues
  });

  const onSubmit = data => {
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          ref={register}
          placeholder="username"
          type="text"
          name="username"
        />
        <input 
          ref={register}
          placeholder="password"
          type="text"
          name="password"
        />
        <input 
          ref={register}
          placeholder="email"
          type="text"
          name="email"
        />
        <input 
          ref={register}
          placeholder="age"
          type="text"
          name="age"
        />
      </form>
    </div>
  )
};

export default UserForm;
