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

const toggleLike = gql`
    mutation ToggleLike($likes: Number){
        toggleUser(likes: $likes){ 
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

export { createPostMutation, createUserMutation, toggleLike }
