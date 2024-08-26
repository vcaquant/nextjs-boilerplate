import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { User } from "@prisma/client";

type Store = {
  userId: string;
  setUserId: (timerId: string) => void;

  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;

  username: string;
  setUsername: (username: string) => void;

  setUser: (user: User) => void;
};

export const useUserStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        userId: "",
        setUserId: (userId: string) => set(() => ({ userId })),

        name: "",
        setName: (name: string) => set(() => ({ name })),
        email: "",
        setEmail: (email: string) => set(() => ({ email })),
        isVerified: false,
        setIsVerified: (isVerified: boolean) => set(() => ({ isVerified })),
        avatar: "",
        setAvatar: (avatar: string) => set(() => ({ avatar })),

        username: "",
        setUsername: (username: string) => set(() => ({ username })),

        setUser: (user: User) => {
          set(() => ({
            userId: user.id,
            name: user.name ?? "",
            email: user.email ?? "",
            isVerified: user.emailVerified ? true : false,
            avatar: user.image ?? "",
            username: user.username,
          }));
        },
      }),
      {
        name: "user-storage",
      }
    )
  )
);
