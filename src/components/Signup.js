import React, { useEffect } from 'react';

const Signup = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <h3>Sign up now to share and see your friend's best life moments!</h3>
      <form action="">
        <label htmlFor="user-email">Email:&nbsp;</label>
        <input type="text" placeholder="Enter your email" name="user-email" /><br />
        <label htmlFor="user-name">Username:&nbsp;</label>
        <input type="text" placeholder="Enter your username" name="user-name" /><br />
        <label htmlFor="user-password">Password:&nbsp;</label>
        <input type="password" placeholder="Enter your password" name="user-password" /><br />
        <button>Log in</button>
      </form>
    </div>
  )
}

export default Signup;
