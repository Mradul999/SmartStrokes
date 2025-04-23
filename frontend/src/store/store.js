import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const store = create(
  persist(
    (set) => ({
      currentUser: null,
      isVerifying: false,
      setVerifying: (value) => set({ isVerifying: value }),
      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null }),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => sessionStorage) }
  ) // closing tab aur browser reset the state to null
);

export default store;
