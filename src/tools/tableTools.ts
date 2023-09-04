import { getStaffInfoLocal } from "./auth";
import { saveAs } from "file-saver";
import { getEvaluationStatus } from "../pages/Recruitment/PreScreeningPage/data";
import {
	getPreScreeningStatusForTable,
	recruiterInterviewStatus,
} from "../pages/Recruitment/InterviewPage/data";

export function addKeys<T = Recruiter>(array: T[]): (T & { key: number })[] {
	return array.map((item, index) => ({
		...item,
		key: index,
	}));
}

export async function filterDataByPermissions(data: Recruiter[]) {
	const staffInfo = await getStaffInfoLocal();
	const role = staffInfo.role;

	if (role === "super_admin") {
		return data;
	}

	const position_level = staffInfo.position.level;
	const position_name = staffInfo.position.name;
	if (
		position_level === "pastoral_team_leader" &&
		position_name === "young_warrior"
	) {
		return data.filter(
			(item) => item.info.pastoral_team[0] === "young_warrior",
		);
	}

	return data.filter((item) => item.info.pastoral_team[1] === position_name[1]);
}

export async function downloadTableData(data: Recruiter[]) {
	const tableDataList = [];
	tableDataList.push(
		"Name, Phone, Email, Pastoral Team, Pastoral Zone, Team, Department, Ministry, Pre-screening Status, Interview Status, Evaluation Status",
	);

	data.forEach((item) => {
		const name = item.info.name;
		const phone = item.info.phone ? item.info.phone : "";
		const email = item.info.email;
		const pastoral_team = item.info.pastoral_team[0];
		const pastoral_zone = item.info.pastoral_team[1];
		const team = item.info.ministry[0];
		const department = item.info.ministry[1];
		const ministry = item.info.ministry[2];
		const pre_screening_status = getPreScreeningStatusForTable(item);
		const interview_status = recruiterInterviewStatus(item);
		const evaluation_status = getEvaluationStatus(item);
		tableDataList.push(
			`${name}, ${phone}, ${email}, ${pastoral_team}, ${pastoral_zone}, ${team}, ${department}, ${ministry}, ${pre_screening_status}, ${interview_status}, ${evaluation_status}`,
		);
	});

	const staffInfo = await getStaffInfoLocal();
	let position_name = staffInfo.position.name;

	if (position_name === undefined) {
		position_name = ["recruitment_data"];
	} else if (typeof position_name === "string") {
		position_name = [position_name];
	}

	const file_name = position_name.join("_");

	const tableDataString = tableDataList.join("\n");
	downloadCSVData(tableDataString, file_name);
}

// export function downloadData(data, file_name: string) {
// 	// let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
// 	let blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
// 	saveAs(blob, file_name);
// }

export function downloadCSVData(data: string, file_name: string) {
	// let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
	const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
	saveAs(blob, `${file_name}.csv`);
}
