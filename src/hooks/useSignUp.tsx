import useSWR from "swr";

function useSignUp(path: string, fetcher: () => any) {
  return useSWR(path, fetcher);
}

export default useSignUp;
