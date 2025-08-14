import { User } from "@/app/users/_database";
import { create } from "zustand";

type Store = {
  user: User;
  base64Data: string;
  getState: () => User;
  setState: (user: User) => void;
  setBase64Data: (base64Data: string) => void;
};

export const useStore = create<Store>((set, get) => ({
  base64Data: "",
  user: {
    user_name: "",
    user_email: "",
    user_password: "",
    user_level: 2,
  },
  getState: () => get().user,
  setState: (user: User) => set({ user }),
  setBase64Data: (base64Data: string) => set({ base64Data }),
}));
