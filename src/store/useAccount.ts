import { operations } from "@/@types/identity";
import { create } from "zustand";

type UserStore = {
	user: User2;
	clearStore: () => void;
	setUser: (
		user: operations["get-user"]["responses"]["200"]["content"]["application/json; charset=utf-8"],
	) => void;
};

export const useAccount = create<UserStore>((set) => {
	return {
		user: {
			email: "",
			address: null,
			avatarUrl: "",
			createdAt: "",
			dob: "",
			emailVerified: false,
			familyName: "",
			gender: null,
			givenName: "",
			icNumber: "",
			id: "",
			name: "",
			nickname: "",
			no: 0,
			phoneNumber: "",
			phoneNumberVerified: false,
			updatedAt: "",
			username: "",
		},
		clearStore: () =>
			set(() => ({
				user: {
					email: "",
					address: null,
					avatarUrl: "",
					createdAt: "",
					dob: "",
					emailVerified: false,
					familyName: "",
					gender: null,
					givenName: "",
					icNumber: "",
					id: "",
					name: "",
					nickname: "",
					no: 0,
					phoneNumber: "",
					phoneNumberVerified: false,
					updatedAt: "",
					username: "",
				},
			})),

		setUser: (user) => {
			set(() => ({
				user: {
					email: String(user?.email),
					address: user?.address
						? {
								city: user.address.city,
								country: user.address.country,
								lineOne: user.address.line_one,
								lineTwo: user.address.line_two,
								postalCode: user.address.postal_code,
								state: user.address.state,
						  }
						: null,
					avatarUrl: String(user?.avatar_url),
					createdAt: String(user?.created_at),
					dob: String(user?.date_of_birth),
					emailVerified: user?.email_verified ?? false,
					familyName: String(user?.family_name),
					gender: user?.gender ?? null,
					givenName: String(user?.given_name),
					icNumber: String(user?.ic_number),
					id: String(user?.id),
					name: String(user?.name),
					nickname: String(user?.nickname),
					no: Number(user?.no),
					phoneNumber: String(user?.phone_number),
					phoneNumberVerified: user?.phone_number_verified ?? false,
					updatedAt: String(user?.updated_at),
					username: String(user?.username),
				},
			}));
		},
	};
});
