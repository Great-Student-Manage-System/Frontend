import { loadMyInfoFetcher } from "@apis/api";
import useSWR from "swr";
import { getLocalStorageValue } from "@utility/storage";
import { useSetRecoilState } from "recoil";
import { loginStateAtom } from "@recoil/atom";

function useMyInfo() {
  const accessToken = getLocalStorageValue("token") || "";
  const setLoginState = useSetRecoilState(loginStateAtom);

  const { data: myInfo, error } = useSWR(
    "/api/members/myInfo",
    () => loadMyInfoFetcher(accessToken),
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // 404에서 재시도 안함
        if (error.status === 404) return;

        // 10번까지만 재시도함
        if (retryCount >= 10) return undefined;

        // 5초 후에 재시도
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
      onSuccess: () => setLoginState(true),
    },
  );

  return {
    myInfo,
    isLoading: !error && !myInfo,
    isError: error,
  };
}

export default useMyInfo;
