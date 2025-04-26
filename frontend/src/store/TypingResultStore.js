import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const store = create(
  persist((set) => ({
    typingResult: null,

    setTypingresult: (result) => set({ typingResult: result }),

    clearTypingresult: () => set({ typingResult: null }),
  }))
);

export default store;
