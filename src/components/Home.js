import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <div>
      <h1>Welcome to LifeGram</h1>
      <form action="">
        <label htmlFor="user-email">Email:&nbsp;</label>
        <input type="text" placeholder="Enter your email." name="user-email" /><br />
        <label htmlFor="user-password">Password:&nbsp;</label>
        <input type="password" placeholder="Enter your password" name="user-password" /><br />
        <button>Log in</button>
      </form>
      <p>--------------------OR--------------------</p>
      <Link to="/signup">
        <button>Sign up</button>
      </Link>
    </div>
  )
}

export default Home;
