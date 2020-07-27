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


class MyForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('/api/form-submit-url', {
            method: 'POST',
            body: data,
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Enter username</label>
                <input id="username" name="username" type="text" />

                <label htmlFor="email">Enter your email</label>
                <input id="email" name="email" type="email" />

                <label htmlFor="birthdate">Enter your birth date</label>
                <input id="birthdate" name="birthdate" type="text" />

                <button>Send data!</button>
            </form>
        );
    }
}



<div>
    <h3>Sign up now to share and see your friend's best life moments!</h3>
    <form className="signup-form" onSubmit={(e) => onSubmit(e)} >

        <div>
            <label htmlFor="user-name">Username:&nbsp;</label>
            <input id="username" type="text" placeholder="Username" name="username" ref={register({ required: true, maxLength: 15 })} />
            {errors.username && errors.username.type === 'required' && (< p > This is required!</p>)}
      {errors.username && errors.username.type === 'maxLength' && (< p > This has a maximum length of 15</p>)}
        </div>

        <div>
            <label htmlFor="email">Email:&nbsp;</label>
            <input id="email" type="text" placeholder="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
            {errors.email && errors.email.type === 'required' && (< p > This is required!</p>)}
      {errors.email && errors.email.type === 'pattern' && (< p > This is not a valid email address</p>)}
        </div>

        <div>
            <label htmlFor="password">Password:&nbsp;</label>
            <input id="password" type="password" placeholder="Password" name="password" ref={register({ required: true })} />
            {errors.password && (< p > This is required!</p>)}
        </div>

        <div>
            <label htmlFor="age">Age:&nbsp;</label>
            <input id="age" type="number" placeholder="Age" name="age" ref={register({ required: true, max: 999, min: 1 })} />
            {errors.age && errors.age.type === 'required' && (< p > This is required!</p>)}
      {errors.age && errors.age.type === 'max' && (< p > surely your not 1000years old or over!</p>)}
        </div>

        <button> submit </button>
    </form>



    <form id="formElem">
        <input type="text" name="name" value="John">
            <input type="text" name="surname" value="Smith">
                <input type="submit">
</form>

                <script>
                    formElem.onsubmit = async (e) => {
                        e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
                        method: 'POST',
      body: new FormData(formElem)
    });

    let result = await response.json();

    alert(result.message);
  };
</script>


return fetch('Your Rest url', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
        console.log(response);
        window.location.reload();
      } else {
       console.log('Somthing happened wrong');
      }
}).catch(err => err);
}