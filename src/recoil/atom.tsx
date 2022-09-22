import { atom } from "recoil";

export interface signUpConditionProps {
  email: false;
  password: false;
  nickName: false;
  subject: false;
}

export const signUpConditionAtom = atom<signUpConditionProps>({
  key: "signUpCondition",
  default: { email: false, password: false, nickName: false, subject: false },
});
