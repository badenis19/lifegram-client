import React, { useEffect, useState } from 'react';

import addCommentMutation from "../mutations/mutations";

const Comments = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [comment, setComment] = useState("");

  const postComment = () => {
    console.log("posting")
    // mutation for adding comment
  }

  const postComment = async () => {
    console.log("posting")

    await client.mutate({
      variables: {
        comment: comment
      },
      mutation: addCommentMutation,
      refetchQueries: () => [{ query: getAllPostsQuery }]
    });
    // refreshPage();
  }

  return (
    <div>
      Comments
      {/* image, username, description, timestamp */}
      <form onSubmit={() => postComment()} action="">
        <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="Enter comment"/>
        <button>Post</button>
      </form>
    </div>
  )
}

export default graphql(getMyProfileQuery)(Comments);
