import {create} from "zustand";
import {getStaffInfoLocal} from "../../../tools/auth.js";

export const useSettingModalStore = create((set) => ({
    staff: null,
    initStaff: async () => {
        const res = await getStaffInfoLocal();
        set({staff: res});
    },
    currentTab:0,
    setCurrentTab:(tab)=>set(()=>({currentTab:tab})),
}));