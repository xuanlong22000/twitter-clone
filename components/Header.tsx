import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";

type Props = {
  label?: string;
  showBackArrow?: boolean;
};

const Header: React.FC<Props> = ({ label, showBackArrow }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            color="white"
            size={20}
            className="
              cursor-pointer
              hover:opacity-70
              transition
            "
          />
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
