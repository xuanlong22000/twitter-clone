import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";

type Props = {
  userId?: string;
};

const PostsFeed: React.FC<Props> = ({ userId }) => {
  const { data: posts } = usePosts(userId);
  return (
    <>
      {posts?.map((post: any) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostsFeed;
