import {create} from "zustand";
import {getAvatarUrl, getStaffInfoLocal} from "../../../tools/auth.js";


export const useSettingModalStore = create((set,get) => ({
    staff: null,
    CYC_ID: null,
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
    avatar:null,

    initStaff: async () => {
        const res = await getStaffInfoLocal();
        // console.log(res)
        set({staff: res});
        set({CYC_ID: res.CYC_ID})
        set({username: res.username});
        set({email: res.email});
        set({password: res.password});
        set({phoneNumber: res.phone_number});
        set({ministry_interviewer:  res.ministry.length>0 ? res.ministry[0].ministry === "interviewer" :false});
        set({ministry_scope: res.ministry.length>0? res.ministry[0].scope:null});
        let avatarUrl =await getAvatarUrl()
        set({avatar: avatarUrl});
    },
    currentTab:0,
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
    setAvatar : (newAvatar) => set({avatar: newAvatar}),

    showAllInfo: () => {
        let data = {
            "username": get().username,
            "CYC_ID": get().CYC_ID,
            "email": get().email,
            "password": get().password,
            "phoneNumber": get().phone_number,
            "pastoral_team": get().pastoral_team,
            "pastoral_role": get().pastoral_role,
            "ministry_name": get().ministry_name,
            "ministry_role": get().ministry_role,
            "ministry_interviewer": get().ministry_interviewer,
            "ministry_scope": get().ministry_scope,
            "avatar": get().avatar,
        }
        console.log(data)
    },
}));