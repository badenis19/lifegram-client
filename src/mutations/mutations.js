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

export { addPostMutation }
