import {
  TypeImageProductsTableScheme,
  TypeProductsTableSchema,
} from "@/app/backoffice/products/_database";
import { User } from "@/app/users/_database";
import { create } from "zustand";

type Store = {
  user: User;
  base64Data: string;
  galleryBase64Data: TypeImageProductsTableScheme[];
  getState: () => User;
  setState: (user: User) => void;
  setBase64Data: (base64Data: string) => void;
  setGalleryBase64Data: (payload: TypeImageProductsTableScheme[]) => void;
  productSelected: TypeProductsTableSchema;
  setProductSelected: (product: TypeProductsTableSchema) => void;
};

export const useStore = create<Store>((set, get) => ({
  galleryBase64Data: [],
  base64Data: "",
  user: {
    user_name: "",
    user_email: "",
    user_password: "",
    user_level: 2,
  },
  productSelected: {
    productUUID: "",
    productName: "",
    productDescription: "",
    productImage: "",
    brandUUID: "",
    modelUUID: "",
    productPrice: 0,
  },
  getState: () => get().user,
  setState: (user: User) => set({ user }),
  setBase64Data: (base64Data: string) => set({ base64Data }),
  setGalleryBase64Data: (payload: TypeImageProductsTableScheme[]) =>
    set({ galleryBase64Data: payload }),
  setProductSelected: (product: TypeProductsTableSchema) =>
    set({ productSelected: product }),
}));
