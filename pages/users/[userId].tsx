import Header from "@/components/Header";
import PostsFeed from "@/components/posts/PostsFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

const UserView = () => {
  const router = useRouter();

  const userId = router.query.userId as string;
  const { data: user, isLoading } = useUser(userId);

  if (isLoading || !user) {
    return (
      <div
        className="
            flex
            justify-center
            items-center
            h-full
        "
      >
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header showBackArrow label="User Profile" />
      <UserHero userId={userId} />
      <UserBio userId={userId} />
      <PostsFeed userId={userId} />
    </>
  );
};

export default UserView;
