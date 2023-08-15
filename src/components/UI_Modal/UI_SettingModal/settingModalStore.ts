import { create } from 'zustand';
// import { getAvatarUrl, getStaffInfoLocal } from '@/tools/auth';
import { set as setLocalStorage } from 'idb-keyval';

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
	ministry_scope: string;
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
	setMinistryScope: (newMinistryScope: string) => void;
	setAvatar: (newAvatar: string) => void;
	showAllInfo: () => void;
	initStaff: () => Promise<void>;
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
	ministry_scope: '',
	avatar: '',

	initStaff: async () => {
		console.log('initStaff');
		const mockUser: User = {
			_id: '64b07ec76da3becc1eedb2fb',
			CYC_ID: 123,
			full_name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			ministry: [
				{
					ministry: 'interviewer',
					scope: ['project management', 'software development'],
				},
			],
			password: 'hashed_password',
			role: 'super_admin',
			picture:
				'https://storage.googleapis.com/cyc-ents.appspot.com/avatars/403.jpg',
			created: 1678838400,
			position: { level: 'Staff', name: 'Staff Position' },
			cg_id: 'cg123',
			given_name: 'John',
			family_name: 'Doe',
			name: 'John Doe',
			gender: 'male',
			ic_number: '123456789012',
			phone_number: '123-456-7890',
			nickname: 'JD',
			leader_retreat: {
				year: '2023',
				status: 'registered',
				paid: {
					confirmed: {
						status: true,
						timestamp: 1678924800,
					},
					uploaded: {
						timestamp: 1679011200,
						url: 'https://example.com/payment_receipt.jpg',
						status: true,
					},
				},
				deleted: {
					timestamp: 1679011200,
					reason: 'Changed plans',
				},
			},
			recent_login: 1679011200,
		};
		await setLocalStorage('staff', mockUser);
		// console.log(res)
		set({ staff: mockUser });
		set({ CYC_ID: mockUser.CYC_ID });
		set({ username: mockUser.username });
		set({ email: mockUser.email });
		set({ password: mockUser.password });
		set({ phoneNumber: mockUser.phone_number });
		set({
			ministry_interviewer:
				mockUser.ministry.length > 0
					? mockUser.ministry[0].ministry === 'interviewer'
					: false,
		});
		set({
			ministry_scope:
				mockUser.ministry.length > 0 ? mockUser.ministry[0].scope : null,
		});
		set({ avatar: mockUser.picture });
	},
	currentTab: 0,
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
	setMinistryScope: (newMinistryScope: string) =>
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
