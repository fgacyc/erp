import { postReq, putReq } from '../../../tools/requests.js';

export async function postRecruiter(
	name,
	phone,
	email,
	pastoral_team,
	department1,
) {
	const router = '/recruiter';
	let data = {
		name: name,
		phone: phone,
		email: email,
		pastoral_team: pastoral_team,
		ministry: department1,
	};
	//console.log(data)

	let res = await postReq(router, data);
	console.log(res);
	return res;
}

export async function updateRecruiter(
	RID,
	name,
	phone,
	email,
	pastoral_team,
	department1,
) {
	const router = `/recruiter/${RID}`;
	let data = {
		name: name,
		phone: phone,
		email: email,
		pastoral_team: pastoral_team,
		ministry: department1,
	};
	//console.log(data)
	let res = await putReq(router, data);
	console.log(res);
	return res;
}
