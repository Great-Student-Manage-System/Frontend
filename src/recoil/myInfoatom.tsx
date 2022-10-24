import { atom } from "recoil";

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
