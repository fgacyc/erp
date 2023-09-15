import { create } from "zustand";
import {type  CreditData} from "@/pages/FaithFlix/data.ts";

export interface AddCreditsModalState {
    creditsData: CreditData | null;
    isUpdate: boolean;
    setCreditsData: (creditsData: CreditData | null) => void;
    resetCreditsData: () => void;
}

export const useAddCreditsModalStore = create<AddCreditsModalState>((set) => ({
    creditsData: null,
    isUpdate: false,
    setCreditsData: (creditsData) => {
        set({ creditsData });
        set({ isUpdate: true });
    },
    resetCreditsData: () => {
        set({ creditsData: null });
        set({ isUpdate: false });
    }
}));
