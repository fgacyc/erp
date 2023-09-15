import { create } from "zustand";
import {type VideoDBData} from "@/pages/FaithFlix/data.ts";

export interface AddVideoModalState {
    currentVideoData: VideoDBData | null;
    isUpdate: boolean;
    setVideoData: (videoData: VideoDBData | null) => void;
    resetVideoData: () => void;
}

export const useAddVideoModalStore = create<AddVideoModalState>((set) => ({
    currentVideoData: null,
    isUpdate: false,
    setVideoData: (videoData) => {
        set({ currentVideoData: videoData });
        set({ isUpdate: true });
    },
    resetVideoData: () => {
        set({ currentVideoData: null });
        set({ isUpdate: false });
    }
}));
