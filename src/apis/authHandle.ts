import { setLocalStorage } from "@utility/storage";
import { refreshAccessToken } from "./api";

export function authHandle(promise: Promise<Response>, accessToken: string) {
  return promise
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        const data = await refreshAccessToken(accessToken);
        if (data.code === 200) {
          const { accessToken } = data.data;
          const token = accessToken.split(" ")[1];
          setLocalStorage("token", token);
          // return new Promise((resolve) => resolve({ code: 204 }));
        } else throw new Error(data.messgae);
      } else {
        return {
          code: response.status,
          message: "뭔가 잘못됨...",
        };
      }
    })
    .catch((error) => console.log(error));
}
