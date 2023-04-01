import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
};
const Avatar: React.FC<Props> = ({ userId, isLarge, hasBorder }) => {
  const { data: user } = useUser(userId);
  const router = useRouter();
  const onClick = (e: any) => {
    const url = `/users/${userId}`;

    router.push(url);
  };
  return (
    <div
      className={` 
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative
    `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={user?.profileImage || "/img/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
