import { operations } from "@/@types/schema";

export const transformUserFromAPI = (
	input: operations["get-user"]["responses"]["200"]["content"]["application/json; charset=utf-8"],
): User2 => {
	return {
		id: input.id,
		address: {
			city: input.address?.city ?? "",
			country: input.address?.country ?? "",
			postalCode: input.address?.postal_code ?? "",
			lineOne: input.address?.line_one ?? "",
			state: input.address?.state ?? "",
			lineTwo: input.address?.line_two,
		},
		avatarUrl: input.avatar_url ?? "",
		createdAt: input.created_at,
		dob: input.date_of_birth ?? "",
		email: input.email,
		emailVerified: input.email_verified,
		familyName: input.family_name ?? "",
		gender: input.gender ?? "male",
		givenName: input.given_name ?? "",
		icNumber: input.ic_number ?? "",
		name: input.name,
		nickname: input.nickname ?? "",
		no: input.no,
		phoneNumber: input.phone_number ?? "",
		phoneNumberVerified: input.phone_number_verified ?? false,
		updatedAt: input.updated_at,
		username: input.username ?? "",
	};
};
