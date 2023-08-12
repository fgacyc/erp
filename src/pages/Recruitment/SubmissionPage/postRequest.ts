import { postReq, putReq } from '@/tools/requests';

export async function postRecruiter(
	name: string,
	phone: string,
	email: string,
	pastoral_team: string[],
	department: string[],
) {
	const router = '/recruiter';
	const data = {
		name: name,
		phone: phone,
		email: email,
		pastoral_team: pastoral_team,
		ministry: department,
	};
	//console.log(data)

	const res = await postReq(router, data);
	console.log(res);
	return res;
}

export async function updateRecruiter(
	RID: number,
	name: string,
	phone: string,
	email: string,
	pastoral_team: string[],
	department: string[],
) {
	const router = `/recruiter/${RID}`;
	const data = {
		name: name,
		phone: phone,
		email: email,
		pastoral_team: pastoral_team,
		ministry: department,
	};
	//console.log(data)
	const res = await putReq(router, data);
	console.log(res);
	return res;
}
