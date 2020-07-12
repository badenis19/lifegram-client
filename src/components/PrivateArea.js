import React from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const PrivateArea = () => {

  let history = useHistory();

  // check if there’s the token in the cookies. If not, just go back to the login form
  if (!Cookies.get('token')) {
    history.push('/signin');
  }

  return (
    <div>
      <Query
        query={gql`
          {
            todos {
              id
              name
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) {
            history.push('/signin');
            return <p></p>
          }
          return <ul>{data.todos.map(item => <li key={item.id}>{item.name}</li>)}</ul>
        }}
      </Query>
    </div>
  )
}

export default PrivateArea