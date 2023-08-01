export function padNumberWithZeros(number) {
	let numberString = number.toString(); // 将数字转换为字符串
	let zerosToAdd = 6 - numberString.length; // 计算需要添加的零的数量

	// 在数字字符串前添加零
	for (let i = 0; i < zerosToAdd; i++) {
		numberString = '0' + numberString;
	}

	return 'CYC' + numberString;
}

export function validatePhone(phone) {
	const phoneRegex = /^\d{6,12}$/; // Regex pattern for 6 - 12-digit phone number

	// console.log(phone)

	if (phone.trim() === '') {
		return {
			status: false,
			message: 'Phone number is required',
		};
	}

	if (!phone.match(phoneRegex)) {
		return {
			status: false,
			message: 'Phone must not contain special characters',
		};
	}
	return {
		status: true,
		message: 'success',
	};
}
