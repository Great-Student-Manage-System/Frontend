import { currentModal } from "@data/currentModalState";
import { atom } from "recoil";

export const openModalAtom = atom<boolean>({
  key: "isModalOpen",
  default: false,
});

export const modalState = atom<currentModal>({
  key: "currentModalPage",
  default: currentModal.NONE,
});

export const loginStateAtom = atom({
  key: "loginState",
  default: false,
});
