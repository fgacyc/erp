import { getStaffInfoLocal } from "@/tools/auth";
import { getDateString, getTimeStamp } from "@/tools/datetime";

export async function filterDataHaveAppoint(data: Recruiter[]) {
	const filteredData = await filterByPermission(data);
	const result = [];
	for (let i = 0; i < data.length; i++) {
		const preScreeningStatus = filteredData[i]?.pre_screening.status;
		const applicationStatus = filteredData[i]?.application.status;

		if (preScreeningStatus === true && applicationStatus !== "archived") {
			// filteredData[i]?.key = i;
			result.push(filteredData[i]);
		}
	}
	return result;
}

export async function filterArchivedCandidate(data: Recruiter[]) {
	const filteredData = await filterByPermission(data);
	const result = [];
	for (let i = 0; i < data.length; i++) {
		// const preScreeningStatus = filteredData[i].pre_screening.status;
		const applicationStatus = filteredData[i]?.application.status;

		if (applicationStatus === "archived") {
			// filteredData[i]?.key = i;
			result.push(filteredData[i]);
		}
	}
	//console.log(result)
	return result;
}

export async function filterByPermission(data: Recruiter[]) {
	const staff = await getStaffInfoLocal();
	if (staff.role === "super_admin") {
		return data;
	}

	const scope = staff.ministry[0].scope;
	const result = [];
	for (let i = 0; i < data.length; i++) {
		const ministry = data[i]?.info.ministry[2];
		if (scope.includes(ministry)) {
			result.push(data[i]);
		}
	}
	// console.log(result)
	return result;
}

const appointmentTimes = {
	general: [
		{ value: "1689418800", label: "15/7/2023 (Sat) 7pm" },
		{ value: "1689492600", label: "16/7/2023 (Sun) 3.30pm" },
		{ value: "1690018200", label: "22/7/2023 (Sat) 5.30pm" },
	],
	dance: [
		{ value: "1689998400", label: "22/7/2023 (Sat) 12pm" },
		{ value: "1690099200", label: "23/7/2023 (Sun) 4pm" },
	],
};

export function getAppointmentTimesString(value: string) {
	if (!value) return;

	const general = appointmentTimes.general;
	const dance = appointmentTimes.dance;

	for (let i = 0; i < general.length; i++) {
		if (general[i]?.value === value) {
			return general[i]?.label;
		}
	}

	for (let i = 0; i < dance.length; i++) {
		if (dance[i]?.value === value) {
			return dance[i]?.label;
		}
	}
}

export function getAppointTimes(record: Recruiter) {
	if (!record.appointment) {
		return "N/A";
	}

	const timestamp = record.appointment.ministry.appointment_time * 1000;
	return getDateString(timestamp);
}

export function recruiterInterviewStatus(record: Recruiter) {
	const stamp = getTimeStamp();
	const preScreeningTime = record.pre_screening.pre_screening_time;
	if (record.interview.status === true) {
		return "Interviewed";
	} else if (record.appointment && record.interview.status === false) {
		return "Pending";
	} else if (
		!record.appointment &&
		record.interview.status === false &&
		stamp - preScreeningTime > 86400 * 7
	) {
		return "Not appointed over 7 days";
	} else if (!record.appointment && record.interview.status === false) {
		return "Not appointed";
	} else {
		console.log("recruiterInterviewStatus error");
	}
}

// pad 0 to the left of the number
export function pad(num: number) {
	return ("0" + num).slice(-2);
}

export function getPreScreeningStatusForTable(record: Recruiter) {
	const status = record.pre_screening.status;
	if (status === true) {
		return "Pre-accepted";
	} else if (status === false) {
		return "Pre-rejected";
	} else {
		return "Pending";
	}
}

export const tableDataString = `
    item: [star 1-5][Remarks]
    Pitch 音准:[ ][ ]
    Pronunciation 咬字&发音:[ ][ ]
    Tone 腔调:[ ][ ]
    Beat 节拍:[ ][ ]
    Projection 音量:[ ][ ]
    Breathing 气息:[ ][ ]
    Grooving 乐感:[ ][ ]
    Range 音域:[ ][ ]
    Attitude 态度:[ ][ ]
    Appearance 外形/外在表现:[ ][ ]
   `;
