import axios from "axios";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const loginModal = useLoginModal();

  const hasLiked = () => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  };

  const toggleLike = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      if (hasLiked()) {
        await axios.delete("/api/like", { data: { postId } });
      } else {
        await axios.post("/api/like", { postId });
      }

      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success("Success");
    } catch (error) {
      toast.error("Something");
    }
  };

  return { hasLiked, toggleLike };
};

export default useLike;
