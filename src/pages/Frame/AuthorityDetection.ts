import { getStaffInfoLocal } from "@/tools/auth";

export async function menuPermission() {
	const staff: User = await getStaffInfoLocal();
	const permission = {};
	const newPermission = recruitmentItemsPermission(staff, permission);
	// console.log(permission);
	return newPermission;
}

function recruitmentItemsPermission(staff: User, permission: object) {
	const currentPerm = {
		...permission,
		recruitment_dashboard: true,
		recruitment_add_candidate: true,
		recruitment_pre_screening: false,
		recruitment_interview: false,
		recruitment_evaluation: false,
	};

	if (staff.role === "super_admin") {
		currentPerm.recruitment_pre_screening = true;
		currentPerm.recruitment_interview = true;
		currentPerm.recruitment_evaluation = true;
		return currentPerm;
	}

	if ("position" in staff) {
		if (
			staff.position.level === "pastoral_team_leader" ||
			staff.position.level === "pastoral_zone_leader"
		) {
			// pastoral team leader or pastoral zone leader
			if (
				Object.prototype.hasOwnProperty.call(staff, "ministry") &&
				staff.ministry.length > 0 &&
				staff.ministry[0]?.ministry === "interviewer"
			) {
				//interviewer
				currentPerm.recruitment_pre_screening = true;
				currentPerm.recruitment_interview = true;
				currentPerm.recruitment_evaluation = true;
				return currentPerm;
			}
		}
	}

	if ("position" in staff) {
		if (Object.keys(staff.position).length === 0) {
			//no position
			currentPerm.recruitment_pre_screening = false;
			currentPerm.recruitment_interview = false;
			currentPerm.recruitment_evaluation = false;
			return currentPerm;
		} else if (
			staff.position.level === "pastoral_team_leader" ||
			staff.position.level === "pastoral_zone_leader"
		) {
			//pastoral team leader or pastoral zone leader
			currentPerm.recruitment_pre_screening = true;
			currentPerm.recruitment_interview = false;
			currentPerm.recruitment_evaluation = false;
			return currentPerm;
		}
	}

	if (staff.ministry.length === 0) {
		//no ministry
		currentPerm.recruitment_pre_screening = false;
		currentPerm.recruitment_interview = false;
		currentPerm.recruitment_evaluation = false;
		return currentPerm;
	} else if (staff.ministry[0]?.ministry === "interviewer") {
		//interviewer
		currentPerm.recruitment_pre_screening = false;
		currentPerm.recruitment_interview = true;
		currentPerm.recruitment_evaluation = true;
		return currentPerm;
	}
}
