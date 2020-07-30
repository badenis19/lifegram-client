import { gql } from 'apollo-boost';

/* Mutations */

// Create

const createPostMutation = gql`
    mutation CreatePost($description: String!, $img: String, $userId: String){
        createPost(description: $description, img: $img, userId: $userId){ 
            _id
        }
    }
`;

// const updateLikeMutation = gql`
//     mutation UpdateLike($likes: Int){
//         updateLike(_id: ID, likes: $likes){ 
//             _id
//         }
//     }
// `;

const followUserMutation = gql`
    mutation FollowUser($id: String){
        followUser(_id: $id){ 
         _id
        }
    }
 `;

 const unfollowUserMutation = gql`
    mutation UnFollowUser($id: String){
        unfollowUser(_id: $id){ 
         _id
        }
    }
 `;

// Not used for now
const createUserMutation = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!, $img: String, $age: Int, $description: String, $followers: [ID], $following: [ID]){
        createUser(username: $username, email: $email, password: $password, img: $img, age: $age, description: $description, followers: $followers, following: $following ){ 
            _id
        }
    }
`;

export { createPostMutation, createUserMutation, followUserMutation, unfollowUserMutation }
