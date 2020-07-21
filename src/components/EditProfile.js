import React from 'react';
import { useForm } from 'react-hook-form';

const SignupForm = () => {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Username" name="Username" ref={register({ required: true, max: 15, min: 1, maxLength: 80 })} />
            <input type="text" placeholder="Email" name="Email" ref={register({ required: true })} />
            <input type="tel" placeholder="Password" name="Password" ref={register({ required: true })} />
            <input type="number" placeholder="Age" name="Age" ref={register({ required: true, max: 199, min: 1, maxLength: 3 })} />

            <input type="submit" />
        </form>
    );
};


export default SignupForm;

// adjust the form so that it reflects the fiel that we have at the moment.
// priority - add error message(simple form variant).
