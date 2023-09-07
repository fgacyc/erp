export function validEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export const valid = (
	name: string,
	phone: string,
	email: string,
	pastoral: string[],
	department: string[],
) => {
	if (name === "") {
		alert("Name cannot be empty");
		return false;
	}

	if (phone === "") {
		alert("Phone cannot be empty");
		return false;
	}

	if (email === "" || !validEmail(email)) {
		alert("Email cannot be empty or invalid");
		return false;
	}

	if (pastoral.length === 0) {
		alert("Pastoral cannot be empty");
		return false;
	}

	if (pastoral[0] !== "wonder kids") {
		if (pastoral[1] === undefined) {
			alert("Pastoral team cannot be empty");
			return false;
		}
	}

	if (department.length === 0 || !department) {
		alert("Department cannot be empty");
		return false;
	}

	if (department.length !== 3) {
		alert("Please select your department");
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
};
