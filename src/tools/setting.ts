import { update } from 'idb-keyval';
import { getStaffInfoLocal } from './auth';

const setting = {
	remember_me: false,
};

export async function setRememberMeVal(val: boolean) {
	setting.remember_me = val;
	// update local
	const staff = await getStaffInfoLocal();
	console.log(staff);
	staff.setting = setting;
	await update('staff', staff);
	// const staff1 = await getStaffInfoLocal();
	// console.log(staff1);
}
