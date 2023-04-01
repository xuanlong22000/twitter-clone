import axios from "axios";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = () => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  };

  const toggleFollow = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      if (isFollowing()) {
        await axios.delete("/api/follow", { data: { userId } });
      } else {
        await axios.post("/api/follow", { userId });
      }

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
