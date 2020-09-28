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

const addCommentMutation = gql`
mutation AddComment($comment: String!){
    addComment(comment: $comment){ 
        _id
    }
}
`;

const followUserMutation = gql`
    mutation FollowUser($id: String, $username: String, $img: String){
        followUser(_id: $id, username: $username, img: $img){ 
         _id
        }
    }
 `;

const likePostMutation = gql`
    mutation LikePost($id: String){
        likePost(_id: $id){ 
            _id
        }
    }
`;

const editUserProfileMutation = gql`
    mutation EditUserProfile($username: String, $email: String, $password: String, $img: String, $age: Int, $description: String, $height: String, $weight: String){
        editUserProfile(username: $username, email: $email, password: $password, img: $img, age: $age, description: $description, height: $height, weight: $weight ){ 
            age
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

const deletePostMutation = gql`
    mutation DeletePost($id: String){
        deletePost(_id: $id){
            _id
        }
    }
`;

export {
  createPostMutation, createUserMutation, followUserMutation, likePostMutation, addCommentMutation, deletePostMutation, editUserProfileMutation,
};
