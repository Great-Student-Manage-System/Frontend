import { getLocalStorageValue } from "@utility/storage";
import { atom } from "recoil";

export const accessTokenAtom = atom({
  key: "accessToken",
  default: getLocalStorageValue("token"),
});
