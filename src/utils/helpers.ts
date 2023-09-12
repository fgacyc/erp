const hasDuplicates = (arr: string[]): boolean => {
	const set = new Set();

	for (const item of arr) {
		if (set.has(item)) {
			return true; // Duplicate found
		}
		set.add(item);
	}

	return false; // No duplicates found
};

export const hasDuplicatesInData = (data: (string | string[])[]): boolean => {
	const elementsToCheck: string[] = data
		.map((subArray) => subArray[0] as string)
		.filter(Boolean);
	return hasDuplicates(elementsToCheck);
};
