import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import Avatar from "../Avatar";

type Props = {
  data: any;
};

const CommentItem: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const gotoUser = () => {
    router.push(`/user/${data.user.id}`);
  };

  return (
    <div
      className="
        border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition
        "
    >
      <div className="flex items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex items-center gap-2">
            <p
              onClick={gotoUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {formatDistanceToNowStrict(new Date(data.createdAt))}
            </span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
