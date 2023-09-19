import { create } from "zustand";
import {CourseDB} from "@/pages/Education/CoursesManagement.tsx";

export interface AddCoursesState {
    courseData:CourseDB | null;
    isUpdate:boolean;
    setCourseData: (courseData:CourseDB | null) => void;
    resetCourseData: () => void;
}


export const useAddCoursesStore = create<AddCoursesState>((set) => ({
    courseData: null,
    isUpdate:false,
    setCourseData: (courseData:CourseDB | null) => {
        set({ courseData });
        set({isUpdate:true});
    },
    resetCourseData: () => {
        set({ courseData: null });
        set({isUpdate:false});
    },
}));
