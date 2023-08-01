import { getAccAndPsw, login } from './auth.js';

let current = null;
export async function getCurrentUser() {
	if (current === null) {
		let [CYC_ID, password] = getAccAndPsw();
		let res = await login(CYC_ID, password);
		//console.log(res)
		if (res.status) {
			current = res.data;
			return res.data;
		} else {
			return null;
		}
	} else {
		return current;
	}
}
