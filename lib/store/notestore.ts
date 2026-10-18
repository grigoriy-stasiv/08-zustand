
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type NoteDraft = {
  title: string;
  content: string;
  tag: string;
};

type NoteStore = {
  draft: NoteDraft;
  setDraft: (draft: Partial<NoteDraft>) => void;
  clearDraft: () => void;
};

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (updatedDraft) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...updatedDraft,
          },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        draft: state.draft,
      }),
    }
  )
);
