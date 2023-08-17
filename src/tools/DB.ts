import { getReq } from './requests';

export async function getAllUsers(): Promise<Recruiter[]> {
	const url = '/recruiters?account=admin&password=admin';
	return await getReq(url);
}
