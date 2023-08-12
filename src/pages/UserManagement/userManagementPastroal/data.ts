export function formatData(data: CGL[]) {
	const newData = [...data];
	for (const cgl of data) {
		cgl.role = 'CGL';
		if (cgl.new_members && cgl.new_members.length > 0) {
			for (const member of cgl.new_members) {
				if (member.email !== cgl.email) {
					newData.push({ ...member });
				}
			}
		}
	}
	return newData;
}
