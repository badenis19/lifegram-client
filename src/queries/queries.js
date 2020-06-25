import { gql } from 'apollo-boost';

/* Queries */




/* POSTS */

// Get all
const getUserPostsQuery = gql`
{
  posts {
    id
    img
    description
    likes
    comments
    timeStamp
     user{
      username
    }
  }
}
`;

// Get one
// const getProductQuery = gql`
//   {
//     product($id: ID){
//       name
//       price
//       img_url
//     }
//   }
// `;

/* USERS */

// Get all
const getUsersPostsQuery = gql`
{
  users {
    id
    username
    password
    age
    description
    followers
    following
    posts {
      id
      img
      description
      likes
      comments
      timeStamp
    }
  }
}
`;




export { getUserPostsQuery, getUsersPostsQuery }