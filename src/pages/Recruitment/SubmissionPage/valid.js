export function validEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export default function valid(name, phone, email, pastoral, department1) {
	if (name === '') {
		alert('Name cannot be empty');
		return false;
	}

	if (phone === '') {
		alert('Phone cannot be empty');
		return false;
	}

	if (email === '' || !validEmail(email)) {
		alert('Email cannot be empty or invalid');
		return false;
	}

	if (pastoral === []) {
		alert('Pastoral cannot be empty');
		return false;
	}

	if (pastoral[0] !== 'wonder kids') {
		if (pastoral[1] === undefined) {
			alert('Pastoral team cannot be empty');
			return false;
		}
	}

	if (department1 === [] || !department1) {
		alert('Department cannot be empty');
		return false;
	}

	if (department1.length !== 3) {
		alert('Please select your department1');
		return false;
	}

	// if (!department2) {
	//     department2 = [];
	// }
	//
	// if (department2.length >0 && department2.length !== 3) {
	//     alert("Please select your department2");
	//     return false;
	// }

	return true;
}
