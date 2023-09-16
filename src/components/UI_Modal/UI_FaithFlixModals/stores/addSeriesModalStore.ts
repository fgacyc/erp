import { create } from "zustand";
import { SeriesData} from "@/pages/FaithFlix/SeriesManagement.tsx";

export interface AddSeriesModalState {
    episodeData: SeriesData | null;
    isUpdate: boolean;
    setEpisodeData: (episodeData: SeriesData | null) => void;
    resetEpisodeData: () => void;
}

export const useAddSeriesModalStore = create<AddSeriesModalState>((set) => ({
    episodeData: null,
    isUpdate: false,
    setEpisodeData: (episodeData) => {
        set({ episodeData });
        set({ isUpdate: true });
    },
    resetEpisodeData: () => {
        set({ episodeData: null });
        set({ isUpdate: false });
    },
}));
