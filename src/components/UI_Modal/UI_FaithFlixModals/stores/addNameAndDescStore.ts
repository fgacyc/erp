import { create } from "zustand";
import {type VideoRole,GenreTag} from "@/pages/FaithFlix/data.ts";

export interface AddRoleModalState {
    roleData: VideoRole | null;
    isUpdate: boolean;
    setRoleData: (roleData: VideoRole | null) => void;
    resetRoleData: () => void;
}

export interface AddGenreTagModalState {
    genreTagData: GenreTag | null;
    isUpdate: boolean;
    setGenreTagData: (roleData: GenreTag | null) => void;
    resetGenreTagData: () => void;
}



export const useAddRoleModalStore = create<AddRoleModalState>((set) => ({
    roleData: null,
    isUpdate: false,
    setRoleData: (roleData) => {
        set({ roleData });
        set({ isUpdate: true });
    },
    resetRoleData: () => {
        set({ roleData: null });
        set({ isUpdate: false });
    }
}));

export const useAddGenreTagModalStore = create<AddGenreTagModalState>((set) => ({
    genreTagData: null,
    isUpdate: false,
    setGenreTagData: (genreTagData) => {
        set({ genreTagData });
        set({ isUpdate: true });
    },
    resetGenreTagData: () => {
        set({ genreTagData: null });
        set({ isUpdate: false });
    }
}));
