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

// const loginMutation = gql`
// mutation($email: String!, $password: String){
//     addUser(email: $email, password: $password){ 
//         description
//         id
//     }
// }
// `;

export { createPostMutation }
