export function getTotals(data: Recruiter[]) {
	const totalApplicants = data.length;
	let totalPending = 0;
	let totalPreAccepted = 0;
	let totalAccepted = 0;

	for (let i = 0; i < data.length; i++) {
		if (data[i]?.application.status === 'pending') {
			totalPending += 1;
		}
		if (data[i]?.pre_screening.status === true) {
			totalPreAccepted += 1;
		}
		if (data[i]?.application.status === 'accepted') {
			totalAccepted += 1;
		}
	}
	// console.log(totalApplicants, totalPending, totalAccepted)
	return [totalApplicants, totalPending, totalPreAccepted, totalAccepted];
}

// export function getPastoralTeamCount(data, index, field) {
//     let pastoral_team_count = 0;

//     for (let i = 0; i < data.length; i++) {
//         if (data[i].info.pastoral_team[index] === field) {
//             pastoral_team_count += 1;
//         }
//     }
//     return pastoral_team_count;
// }

export function getInfoCount(
	data: Recruiter[],
	other: 'pastoral_team' | 'ministry',
	index: number,
	field: string,
) {
	let count = 0;

	for (let i = 0; i < data.length; i++) {
		if (data[i]?.info[other][index] === field) {
			count += 1;
		}
	}

	return count;
}
