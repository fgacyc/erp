import {create} from "zustand";
import {getStaffInfoLocal} from "../../../tools/auth.js";
import {subscribeWithSelector} from "zustand/middleware";

export const useSettingModalStore = create((set,get) => ({
    staff: null,
    username:null,
    email:null,
    password:null,
    phone_number:null,
    pastoral_team : null,
    pastoral_role : null,
    ministry_name : null,
    ministry_role : null,
    ministry_interviewer : null,
    ministry_scope : null,


    initStaff: async () => {
        const res = await getStaffInfoLocal();
        set({staff: res});
        set({username: res.username});
        set({email: res.email});
        set({password: res.password});
        set({phoneNumber: res.phone_number});
    },
    currentTab:1,
    setCurrentTab:(tab)=>set(()=>({currentTab:tab})),
    setUsername: (newUsername) => set({username: newUsername}),
    setEmail : (newEmail) => set({email: newEmail}),
    setPassword : (newPassword) => set({password: newPassword}),
    setPhoneNumber : (newPhoneNumber) => set({phone_number: newPhoneNumber}),
    setPastoralTeam : (newPastoralTeam) => set({pastoral_team: newPastoralTeam}),
    setPastoralRole : (newPastoralRole) => set({pastoral_role: newPastoralRole}),
    setMinistryName : (newMinistryName) => set({ministry_name: newMinistryName}),
    setMinistryRole : (newMinistryRole) => set({ministry_role: newMinistryRole}),
    setMinistryInterviewer : (isMinistryInterviewer) => set({ministry_interviewer: isMinistryInterviewer}),
    setMinistryScope : (newMinistryScope) => set({ministry_scope: newMinistryScope}),


    showAllInfo: () => {
        let data = {
            "username": get().username,
            "email": get().email,
            "password": get().password,
            "phoneNumber": get().phone_number,
        }
        console.log(data)
    },
}));