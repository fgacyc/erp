import { filterByPermission, getAppointTimes } from '../InterviewPage/data';
import { getTimeStamp } from '@/tools/datetime';

export function getPassStatus(record: Recruiter) {
	const applicationStatus = record.application.status;
	if (applicationStatus === 'accepted') return 'accepted';
	else if (applicationStatus === 'rejected') return 'rejected';
	else if (applicationStatus === 'kiv') return 'kiv';
	else return 'pending';
}

export async function filterEvaluationData(data: Recruiter[]) {
	const filteredData = await filterByPermission(data);
	const dataFilter = [];
	for (const item of filteredData) {
		if (item?.interview.status === true) {
			dataFilter.push(item);
		}
	}
	// console.log(dataFilter)
	return dataFilter;
}

function calculateDateTimeFilterData(data: Recruiter[]) {
	const dateStrings: string[] = [];
	for (const item of data) {
		const dateStr = getAppointTimes(item);
		if (dateStr === 'N/A') continue;
		if (!dateStrings.includes(dateStr)) {
			dateStrings.push(dateStr);
		}
	}
	return dateStrings;
}

function convertFilterDataForm(data: string[]) {
	const filterData = [];
	for (const item of data) {
		filterData.push({
			text: item,
			value: item,
		});
	}
	return filterData;
}

export function getDateTimeFilterData(data: Recruiter[]) {
	return convertFilterDataForm(calculateDateTimeFilterData(data));
}

export function getAppoInsightData(data: Recruiter[]) {
	const appoInsightData = [];

	const filterData = data.filter((item) => {
		if (Object.prototype.hasOwnProperty.call(item, 'appointment')) {
			const appoTime = item.appointment.ministry.appointment_time;
			if (appoTime > getTimeStamp() - 2 * 24 * 60 * 60) {
				return true;
			}
		}
		return false;
	});

	const dateStrings = calculateDateTimeFilterData(filterData);
	for (const dateStr of dateStrings) {
		const ministryCounts: { [ministry: string]: number } = {}; // Object to store counts for each ministry on the specific date

		for (const item of filterData) {
			const appointTime = getAppointTimes(item);
			if (appointTime === dateStr) {
				const ministry = item.info.ministry[2] as string; // Assuming "ministry" is a string or an identifier
				ministryCounts[ministry] = (ministryCounts[ministry] || 0) + 1;
			}
		}

		// Convert the ministryCounts object to an array of objects with "ministry" and "value" properties
		const ministriesData = Object.entries(ministryCounts).map(
			([ministry, count]) => ({
				ministry,
				value: count,
			}),
		);

		appoInsightData.push({
			date: dateStr,
			ministries: ministriesData,
		});
	}
	return appoInsightData;
}

export const classifyQuestion = (QAs: InterviewQuestion[]) => {
	const res: {
		general: InterviewQuestion[];
		specific: InterviewQuestion[];
		'freeQ&As': InterviewQuestion[];
	} = {
		general: [],
		specific: [],
		'freeQ&As': [],
	};

	for (const item of QAs) {
		if (item.type === 'general') {
			res.general.push(item);
		} else if (item.type === 'freeQ&As') {
			res['freeQ&As'].push(item);
		} else {
			res.specific.push(item);
		}
	}
	return res;
};
