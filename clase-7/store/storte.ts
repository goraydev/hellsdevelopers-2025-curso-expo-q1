import { User } from "@/app/users/_database";
import { create } from "zustand";

type Store = {
  user: User;
  getState: () => User;
  setState: (user: User) => void;
};

export const useStore = create<Store>((set, get) => ({
  user: {
    user_name: "",
    user_email: "",
    user_password: "",
    user_level: 2,
  },
  getState: () => get().user,
  setState: (user: User) => set({ user }),
}));
