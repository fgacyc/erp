import { getReq } from './requests.js';

export async function getAllUsers() {
	let url = '/recruiters?account=admin&password=admin';
	return await getReq(url);
}
