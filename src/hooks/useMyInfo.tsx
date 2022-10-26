import { loadMyInfoFetcher } from "@apis/api";
import useSWR from "swr";
import { getLocalStorageValue } from "@utility/storage";

function useMyInfo() {
  const accessToken = getLocalStorageValue("token") || "";

  const { data: myInfo, error } = useSWR("/api/members/myInfo", () =>
    loadMyInfoFetcher(accessToken),
  );

  console.log(myInfo, error);

  return {
    myInfo,
    isLoading: !error && !myInfo,
    isError: error,
  };
}

export default useMyInfo;
