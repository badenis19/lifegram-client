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
const getSingleUserDetailsQuery = gql`
  {
    user(id: "5ef3602068f1d34b9d562635"){
      id,
      username,
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

export { getUserPostsQuery, getUsersPostsQuery, getSingleUserDetailsQuery }