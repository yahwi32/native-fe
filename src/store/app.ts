import { createJSONStorage, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

import { storage } from "./common";

import { User } from "@/api/user/user.type";

type AppStoreProps = {
  currentUser: User | undefined;
  setCurrentUser: (user: User) => void;
};

const useAppStore = createWithEqualityFn<AppStoreProps>()(
  persist(
    (set) => ({
      currentUser: undefined,
      setCurrentUser: (user: User) => {
        set((state) => {
          return { ...state, currentUser: user };
        });
      },
    }),
    {
      name: "user-storage", // unique name
      storage: createJSONStorage(() => storage),
    }
  ),
  shallow
);

const useCurrentUser = () => {
  const currentUser = useAppStore((state) => state.currentUser);
  return currentUser;
};

export { useAppStore as default, useCurrentUser };
