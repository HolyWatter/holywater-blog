import { atom } from "recoil";

export const currentUser = atom({
  key: "currentUser",
  default: {},
});

export const loginModal = atom({
  key: "loginModal",
  default: false,
});

export const signupModal = atom({
  key: "signupModal",
  default: false,
});
