import { create } from 'zustand';
// import { getAvatarUrl, getStaffInfoLocal } from '@/tools/auth';

export const useSettingModalStore = create<{
	staff?: User;
	CYC_ID: number;
	username: string;
	email: string;
	password: string;
	phoneNumber: string;
	pastoral_team: string[];
	pastoral_role: string;
	ministry_name: string[];
	ministry_role: string;
	ministry_interviewer: boolean;
	ministry_scope: string[];
	avatar: string;
	currentTab: number;
	setCurrentTab: (tab: number) => void;
	setUsername: (newUsername: string) => void;
	setEmail: (newEmail: string) => void;
	setPassword: (newPassword: string) => void;
	setPhoneNumber: (newPhoneNumber: string) => void;
	setPastoralTeam: (newPastoralTeam: string[]) => void;
	setPastoralRole: (newPastoralRole: string) => void;
	setMinistryName: (newMinistryName: string[]) => void;
	setMinistryRole: (newMinistryRole: string) => void;
	setMinistryInterviewer: (isMinistryInterviewer: boolean) => void;
	setMinistryScope: (newMinistryScope: string[]) => void;
	setAvatar: (newAvatar: string) => void;
	showAllInfo: () => void;
	setStaff: (user: User) => void;
}>((set, get) => ({
	staff: undefined,
	CYC_ID: 0,
	username: '',
	email: '',
	password: '',
	phoneNumber: '',
	pastoral_team: [],
	pastoral_role: '',
	ministry_name: [],
	ministry_role: '',
	ministry_interviewer: false,
	ministry_scope: [],
	avatar: '',

	currentTab: 0,

	setStaff: (user: User) => set(() => ({ ...user })),
	setCurrentTab: (tab: number) => set(() => ({ currentTab: tab })),
	setUsername: (newUsername: string) => set({ username: newUsername }),
	setEmail: (newEmail: string) => set({ email: newEmail }),
	setPassword: (newPassword: string) => set({ password: newPassword }),
	setPhoneNumber: (newPhoneNumber: string) =>
		set({ phoneNumber: newPhoneNumber }),
	setPastoralTeam: (newPastoralTeam: string[]) =>
		set({ pastoral_team: newPastoralTeam }),
	setPastoralRole: (newPastoralRole: string) =>
		set({ pastoral_role: newPastoralRole }),
	setMinistryName: (newMinistryName: string[]) =>
		set({ ministry_name: newMinistryName }),
	setMinistryRole: (newMinistryRole: string) =>
		set({ ministry_role: newMinistryRole }),
	setMinistryInterviewer: (isMinistryInterviewer: boolean) =>
		set({ ministry_interviewer: isMinistryInterviewer }),
	setMinistryScope: (newMinistryScope: string[]) =>
		set({ ministry_scope: newMinistryScope }),
	setAvatar: (newAvatar: string) => set({ avatar: newAvatar }),

	showAllInfo: () => {
		const data = {
			username: get().username,
			CYC_ID: get().CYC_ID,
			email: get().email,
			password: get().password,
			phoneNumber: get().phoneNumber,
			pastoral_team: get().pastoral_team,
			pastoral_role: get().pastoral_role,
			ministry_name: get().ministry_name,
			ministry_role: get().ministry_role,
			ministry_interviewer: get().ministry_interviewer,
			ministry_scope: get().ministry_scope,
			avatar: get().avatar,
		};
		console.log(data);
	},
}));
