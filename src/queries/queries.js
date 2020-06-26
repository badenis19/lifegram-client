import { gql } from 'apollo-boost';

/* Queries */

/* POSTS */

// Get all
const getAllPostsQuery = gql`
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

/* USERS */


// user(id: "5ef3602068f1d34b9d562635"){
// Get one
const getSingleUserDetailsQuery = gql`
  { 
    user(id: "5ef50e5a2af31853d8f4964a"){
      id,
      username,
      description
      img
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

export { getAllPostsQuery, getUsersPostsQuery, getSingleUserDetailsQuery }