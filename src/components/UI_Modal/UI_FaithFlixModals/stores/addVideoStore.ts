import {create} from "zustand";
import {type VideoDBData} from "@/pages/FaithFlix/data.ts";

interface CreditsData {
    credits_ids: number[];
    role_id: number;
}

interface VideoFormData {
    cover_url: string;
    credits: CreditsData[];
    definition: "hd" | "sd";
    description: string;
    duration: string;
    genres: number[];
    release_date: string;
    subtitle: string[];
    tags: number[];
    title: string;
    video_id: number;
    video_url: string;
}


export interface AddVideoModalState {
    currentVideoData: VideoFormData | null;
    isUpdate: boolean;
    isUseCachedData: boolean;
    setVideoTableData: (videoTableData: VideoDBData | null) => void;
    setVideoData: (videoData: VideoFormData) => void;
    resetVideoData: () => void;
    setCachedData: (bool: boolean) => void;
    setIsUpdate: (bool: boolean) => void;
}

export const useAddVideoModalStore = create<AddVideoModalState>((set) => ({
    currentVideoData: null,
    isUpdate: false,
    isUseCachedData: false,
    setVideoTableData: (videoTableData: VideoDBData|null) => {
        if (videoTableData === null)  return;
        set({
            currentVideoData: {
                cover_url: videoTableData.cover_url,
                credits: [],
                definition: videoTableData.definition,
                description: videoTableData.description,
                duration: videoTableData.duration,
                genres: [],
                release_date: videoTableData.release_date,
                subtitle: [],
                tags: [],
                title: videoTableData.title,
                video_id: videoTableData.video_id,
                video_url: videoTableData.video_url
            }
        });
        set({isUpdate: true});
    },
    setVideoData: (videoData: VideoFormData) => {
        set({currentVideoData: videoData});
        set({isUpdate: false});
        console.log("currentVideoData in store", videoData);
    },
    resetVideoData: () => {
        set({currentVideoData: null});
        set({isUpdate: false});
    },
    setCachedData: (bool: boolean) => {
        set({isUseCachedData: bool});
    },
    setIsUpdate: (bool: boolean) => {
        set({isUpdate: bool});
    }
}));
