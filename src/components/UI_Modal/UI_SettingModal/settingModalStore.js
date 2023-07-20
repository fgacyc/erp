import {create} from "zustand";
import {getStaffInfoLocal} from "../../../tools/auth.js";
import {subscribeWithSelector} from "zustand/middleware";

export const useSettingModalStore = create((set,get) => ({
    staff: null,
    initStaff: async () => {
        const res = await getStaffInfoLocal();
        set({staff: res});
    },
    currentTab:0,
    setCurrentTab:(tab)=>set(()=>({currentTab:tab})),
    updateStaff: (newInfo) => set({staff: Object.assign(get().staff, newInfo)}),
}));

// export  const useSettingModalStore = create(
//     subscribeWithSelector((set,get) => (
//         {
//             staff: null,
//             initStaff: async () => {
//                 const res = await getStaffInfoLocal();
//                 set({staff: res});
//             },
//             currentTab:0,
//             setCurrentTab:(tab)=>set(()=>({currentTab:tab})),
//             updateStaff: (newInfo) => set({staff: Object.assign(get().staff, newInfo)}),
//         }
//     ))
// );