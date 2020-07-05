import { gql } from 'apollo-boost';

/* Mutations */

// Create
const addPostMutation = gql`
    mutation($description: String!, $img: String, $userId: ID!){
        addPost(description: $description, img: $img, userId: $userId){ 
            description
            id
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



export { addPostMutation }
