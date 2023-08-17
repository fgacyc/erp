export const getPaymentStatus = (record: LeadersRetreatRecord) => {
	if (!record.leader_retreat) return 'not registered';

	if (record.leader_retreat.paid.confirmed.status === true) return 'confirmed';

	if (record.leader_retreat.paid.uploaded.status === true) return 'uploaded';

	return 'pending';
};

export function addKeysForLeadersRetreat(
	array: LeadersRetreatRecord[],
): (LeadersRetreatRecord & { key: number })[] {
	return array.map((item, index) => ({
		...item,
		key: index,
	}));
}

// export const changeNameKey = (record: LeadersRetreatRecord[]) => {
// 	const updatedRecords: LeadersRetreatRecord[] = [];
// 	for (const item of record) {
// 		if (Object.prototype.hasOwnProperty.call(item, 'full_name')) {
// 			const updatedItem = {
// 				...item,
// 				name: item.full_name,
// 			};
// 			updatedRecords.push(updatedItem);
// 		}
// 	}
// 	return record;
// };

export const changeNameKeyAndID = (record: MinistryAccount[]) => {
	for (const item of record) {
		if (Object.prototype.hasOwnProperty.call(item, 'full_name')) {
			item['name'] = item.full_name;
		}
		if (Object.prototype.hasOwnProperty.call(item, 'info')) {
			item['name'] = item.info?.name;
			item['ministry'] = item.info?.ministry[2] ?? '';
			item['role'] = 'ministry member';
		} else {
			item['ministry'] = '';
		}
		if (!Object.prototype.hasOwnProperty.call(item, 'CYC_ID')) {
			item['CYC_ID'] = Number(item._id);
		}

		if (Object.prototype.hasOwnProperty.call(item, 'orientation')) {
			item['education'] = 'orientation';
		} else {
			item['education'] = '';
		}
	}
	return record;
};
