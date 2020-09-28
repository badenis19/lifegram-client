import React from 'react';
import { useForm } from 'react-hook-form';

const UserForm = ({ preloadedValues }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: preloadedValues,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form className="edit-user-form" onSubmit={handleSubmit(onSubmit)}>
        {errors.serverError && errors.serverError.message}

        <div className="change-img">
          {/* image here */}
          <p>Change profile photo</p>
        </div>

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
          <input type="number" placeholder="Age" name="age" ref={register({ required: true, max: 999, min: 1 })} />
          {errors.age && errors.age.type === 'required' && (<p> This is required</p>)}
          {errors.age && errors.age.type === 'max' && (<p> surely your not 1000years old or over!</p>)}
        </div>

        <div>
          <input className="trial" id="description" type="text" placeholder="description" name="description" ref={register({ maxLength: 50 })} />
          {errors.description && errors.description.type === 'required' && (<p> This is required</p>)}
          {errors.description && errors.description.type === 'maxLength' && (<p> This has a maximum length of 15</p>)}
        </div>

        <div>
          <input type="password" placeholder="Password" name="password" ref={register({ required: true })} />
          {errors.password && (<p> This is required</p>)}
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
