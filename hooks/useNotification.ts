import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useNotification = (userId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/notification/${userId}` : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useNotification;
