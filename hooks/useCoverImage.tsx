import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ConverImageStore = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};

export const useConverImage = create<ConverImageStore>()(
  devtools(
    (set) => ({
      url: undefined,
      isOpen: false,
      onOpen: () => set({ isOpen: true, url: undefined }),
      onClose: () => set({ isOpen: false, url: undefined }),
      onReplace: (url: string) => set({ isOpen: true, url }),
    }),
    {
      enabled: true,
    }
  )
);
