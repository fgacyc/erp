import { updateStaffInfoLocal } from '../../../tools/auth.ts';
export function logout() {
	updateStaffInfoLocal({ login_status: false }).then(() => {
		// /login
		window.location.href = '/login';
	});
}

export function goToProfile() {
	window.location.href = '/profile';
}
