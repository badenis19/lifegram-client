import React from 'react';

const Home = () => {

  return (
    <div>
      <h1>Welcome to LifeGram</h1>
      <p>Sign in</p>
      <form action="">
        <label htmlFor="user-email">Email:&nbsp;</label>
        <input type="text" placeholder="Enter your email." name="user-email" /><br />
        <label htmlFor="user-password">Password:&nbsp;</label>
        <input type="password" placeholder="Enter your password" name="user-password" /><br />
        <button>Login</button>
      </form>
    </div>
  )
}

export default Home;
