import { getStaffInfoLocal } from './auth.js';
import { saveAs } from 'file-saver';
import { getEvaluationStatus } from '../pages/Recruitment/PreScreeningPage/data.js';
import {
	getPreScreeningStatusForTable,
	recruiterInterviewStatus,
} from '../pages/Recruitment/InterviewPage/data.js';

export function addKeys(array) {
	return array.map((item, index) => {
		item.key = index;
		return item;
	});
}

export async function filterDataByPermissions(data) {
	let staffInfo = await getStaffInfoLocal();
	let role = staffInfo.role;

	if (role === 'super_admin') {
		return data;
	}

	let position_level = staffInfo.position.level;
	let position_name = staffInfo.position.name;
	if (
		position_level === 'pastoral_team_leader' &&
		position_name === 'young_warrior'
	) {
		return data.filter(
			(item) => item.info.pastoral_team[0] === 'young_warrior',
		);
	}

	return data.filter((item) => item.info.pastoral_team[1] === position_name[1]);
}

export async function downloadTableData(data) {
	let tableDataList = [];
	tableDataList.push(
		'Name, Phone, Email, Pastoral Team, Pastoral Zone, Team, Department, Ministry, Pre-screening Status, Interview Status, Evaluation Status',
	);

	data.forEach((item) => {
		let name = item.info.name;
		let phone = item.info.phone ? item.info.phone : '';
		let email = item.info.email;
		let pastoral_team = item.info.pastoral_team[0];
		let pastoral_zone = item.info.pastoral_team[1];
		let team = item.info.ministry[0];
		let department = item.info.ministry[1];
		let ministry = item.info.ministry[2];
		let pre_screening_status = getPreScreeningStatusForTable(item);
		let interview_status = recruiterInterviewStatus(item);
		let evaluation_status = getEvaluationStatus(item);
		tableDataList.push(
			`${name}, ${phone}, ${email}, ${pastoral_team}, ${pastoral_zone}, ${team}, ${department}, ${ministry}, ${pre_screening_status}, ${interview_status}, ${evaluation_status}`,
		);
	});

	let staffInfo = await getStaffInfoLocal();
	let position_name = staffInfo.position.name;

	if (position_name === undefined) {
		position_name = ['recruitment_data'];
	} else if (typeof position_name === 'string') {
		position_name = [position_name];
	}

	let file_name = position_name.join('_');

	let tableDataString = tableDataList.join('\n');
	downloadCSVData(tableDataString, file_name);
}

export function downloadData(data, file_name) {
	// let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
	let blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
	saveAs(blob, file_name);
}

export function downloadCSVData(data, file_name) {
	// let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
	let blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
	saveAs(blob, `${file_name}.csv`);
}
