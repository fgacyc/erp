import { updateStaffInfoLocal } from '@/tools/auth';
export function logout() {
	updateStaffInfoLocal(undefined).then(() => {
		// /login
		window.location.href = '/login';
	});
}

export function goToProfile() {
	window.location.href = '/profile';
}
