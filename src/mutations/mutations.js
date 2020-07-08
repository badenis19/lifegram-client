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

const createUserMutation = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!, $img: String, $age: Int, $description: String, $followers: [ID], $following: [ID]){
        createUser(username: $username, email: $email, password: $password, img: $img, age: $age, description: $description, followers: $followers, following: $following ){ 
            _id
        }
    }
`;

// const loginMutation = gql`
// mutation($email: String!, $password: String){
//     addUser(email: $email, password: $password){ 
//         description
//         id
//     }
// }
// `;

export { createPostMutation, createUserMutation }