import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Avatar from "../Avatar";

type Props = {
  userId?: string;
  data: any;
};

const PostItem: React.FC<Props> = ({ userId, data }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({
    postId: data.id,
    userId,
  });

  const gotoUser = () => {
    router.push(`/users/${data.user.id}`);
  };

  const gotoPost = () => {
    router.push(`/posts/${data.id}`);
  };

  const onLike = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    toggleLike();
  };

  return (
    <div
      onClick={gotoPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex items-start gap-3">
        <Avatar userId={data.user?.id} />
        <div>
          <div
            className="
                flex
                items-center
                gap-2
            "
          >
            <p
              onClick={gotoUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data.user?.name}
            </p>
            <span
              onClick={gotoUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {data?.createdAt
                ? formatDistanceToNowStrict(new Date(data.createdAt))
                : null}
            </span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex items-center mt-3 gap-10">
            <div
              className="
                flex
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-sky-500
                "
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                flex
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-red-500
                "
            >
              {hasLiked() ? (
                <AiFillHeart color="red" />
              ) : (
                <AiOutlineHeart size={20} />
              )}

              <p>{data.likedIds?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
