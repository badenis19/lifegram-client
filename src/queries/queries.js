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
      _id
      username
      img
    }
  }
}
`;

/* USERS */

const getMyProfileQuery = gql`
  { 
    myProfile{
      _id
      username
      email
      password
      age
      description
      img
      followers
      following
      height
      weight
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

// Not used for now, will use for explore page, search page
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

// USERS

// Not used for now, will use for explore page, search page
const allUsersQuery = gql`
  {
    users {
      _id
      username
      description
      img
    }
  }
`;

export {
  getAllPostsQuery, getUsersPostsQuery, getSingleUserDetailsQuery, getMyProfileQuery, allUsersQuery,
};
