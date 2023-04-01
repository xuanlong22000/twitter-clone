import React from "react";
import CommentItem from "./CommentItem";

type Props = {
  comments: string[];
};

const CommentFeed: React.FC<Props> = ({ comments }) => {
  return (
    <div>
      {comments?.map((comment: any) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default CommentFeed;
