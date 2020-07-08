import { gql } from 'apollo-boost';

/* Queries */

/* POSTS */

// Get all
const getAllPostsQuery = gql`
{
  posts {
    _id
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
    user(_id: "5ef50e5a2af31853d8f4964a"){
      _id
      username
      description
      img
      followers
      following
      posts {
        _id
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
    _id
    username
    password
    age
    description
    followers
    following
    posts {
      _id
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