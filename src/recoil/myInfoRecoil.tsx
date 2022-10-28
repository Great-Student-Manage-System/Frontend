import { getLocalStorageValue } from "@utility/storage";
import { atom, selector } from "recoil";

export interface myInfoProps {
  id: string;
  email: string;
  nickName: string;
  subject: string;
  subSubjects?: string[];
}

export const myInfoAtom = atom<myInfoProps | null>({
  key: "myInfo",
  default: null,
});

export const inputState = atom<string>({
  key: "inputState",
  default: "",
});

const BASE_URL = "https://great.robinjoon.xyz";
const accessToken = getLocalStorageValue("token") ?? "";

export const myInfoSelector = selector({
  key: "getMyInfo",
  get: async ({ get }) => {
    const info = await fetch(`${BASE_URL}/api/members/myInfo`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => response.json());

    return info.data;
  },
});