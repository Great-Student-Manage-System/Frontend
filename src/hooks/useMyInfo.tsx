import { loadMyInfoFetcher } from "@apis/api";
import useSWR from "swr";

function useMyInfo() {
  const { data: myInfo, error } = useSWR(
    "/api/members/myInfo",
    loadMyInfoFetcher,
  );

  return {
    myInfo,
    isLoading: !error && !myInfo,
    isError: error,
  };
}

export default useMyInfo;
