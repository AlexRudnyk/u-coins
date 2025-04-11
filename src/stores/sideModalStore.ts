import { create } from "zustand";

import { SideModalActions, SideModalState } from "@/types/stores";

export const useSideModalStore = create<SideModalState & SideModalActions>()(
  (set) => ({
    isOpened: false,
    type: "",
    toggleOpen: () => set((state) => ({ isOpened: !state.isOpened })),
    setType: (value: "LOGIN" | "REGISTER") => set({ type: value }),
  })
);
