import { setLocalStorage } from "@utility/storage";
import { refreshAccessToken } from "./api";

export function authHandle(promise: Promise<Response>, accessToken: string) {
  return promise
    .then(async (response) => {
      if (response.status === 401) {
        const data = await refreshAccessToken(accessToken);
        if (data.code === 200) {
          const { accessToken } = data.data;
          const token = accessToken.split(" ")[1];
          setLocalStorage("token", token);
          // return new Promise((resolve) => resolve({ code: 204 }));
        } else throw new Error(data.messgae);
      } else {
        return response.json();
      } // 여기서 새롭게 accessToken이 갱신됨. 그럼 다시 값 갱신을 해야함. 그리고 갱신된 토큰으로 다시 값을 조회해야 함.
    })
    .catch((error) => console.log(error));
}
