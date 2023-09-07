/// <reference types="vite/client" />

export {};

type EmailResponse = {
	send: {
		status: boolean;
		timestamp?: EpochTimeStamp;
	};
};

type EducationStatus = "finished";

type MinistryTeam = { ministry: string; scope: string[] };
type Position = { level: string; name: string };
declare global {
	// NEW
	type User2 = {
		id: string;
		no: number;
		email: string;
		emailVerified: boolean;
		name: string;
		address: Address | null;
		avatarUrl: string | null;
		createdAt: string | null;
		dob: string | null;
		familyName: string | null;
		gender: Gender | null;
		givenName: string | null;
		icNumber: string | null;
		nickname: string | null;
		phoneNumber: string | null;
		phoneNumberVerified: boolean | null;
		updatedAt: string | null;
		username: string | null;
	};

	type CG = {
		id: string;
		no: number;
		name?: string;
		variant?: string;
		satelliteId: string;
		createdAt: string;
		updatedAt: string;
	};

	type Address = {
		city: string;
		country: string;
		lineOne: string;
		lineTwo?: string;
		postalCode: string;
		state: string;
	};

	type Role = {
		id: string;
		name: string;
		description: string;
		weight: number;
	};

	type Satellite = {
		id: string;
		no: number;
		name: string;
		address: Address;
		createdAt: string;
		updatedAt: string;
	};

	// OLD
	type VocalRating = {
		stars?: number[];
		remarks?: string[];
	};
	type ClientComment = {
		timestamp: EpochTimeStamp;
		updated: EpochTimeStamp;
		comment: string;
		CYC_ID: number;
	};
	type ApplicationStatus =
		| "accepted"
		| "kiv"
		| "rejected"
		| "pending"
		| "pre-accepted"
		| "pre-rejected"
		| "archived";

	type InterviewQuestion = {
		type: "general" | "freeQ&As" | "specific" | "vocalRating";
		question: string;
		candidate: string;
		interviewer: string | VocalRating;
	};

	type Recruiter = {
		_id: string;
		created: EpochTimeStamp;
		updated: EpochTimeStamp;
		application: {
			status: ApplicationStatus;
			updated: EpochTimeStamp;
		};
		pre_screening: {
			status: boolean;
			pre_screening_time: EpochTimeStamp;
			comments: ClientComment[];
			approver: number;
		};
		interview: {
			status: boolean;
			ministry: {
				start_time: EpochTimeStamp;
				end_time: EpochTimeStamp;
				interviewers: number[];
				questions: InterviewQuestion[];
			};
			transfer: {
				start_time: EpochTimeStamp;
				end_time: EpochTimeStamp;
				interviewers?: number[];
				questions: InterviewQuestion[];
			};
			performance_summary: string;
		};
		appointment: {
			ministry: {
				created: EpochTimeStamp;
				appointment_time: EpochTimeStamp;
			};
		};
		email: {
			submission: EmailResponse;
			appointment: EmailResponse;
			offer: {
				type: string;
				send: {
					status: boolean;
					timestamp?: EpochTimeStamp;
				};
				confirm: {
					status: boolean;
					timestamp?: EpochTimeStamp;
				};
			};

			orientation: {
				send: {
					status: boolean;
					timestamp?: EpochTimeStamp;
				};
				confirm: {
					status: boolean;
					timestamp?: EpochTimeStamp;
				};
			};
		};
		evaluation: {
			status: boolean;
			evaluator: number;
		};
		education: {
			msj1: {
				created?: EpochTimeStamp;
				updated?: EpochTimeStamp;
				status: EducationStatus;
			};
			msj2: {
				created?: EpochTimeStamp;
				updated?: EpochTimeStamp;
				status: EducationStatus;
			};
			msj3: {
				created?: EpochTimeStamp;
				updated?: EpochTimeStamp;
				status: EducationStatus;
			};
		};
		orientation: {
			attendance_time: EpochTimeStamp;
		};
		info: {
			ministry: string[];
			name: string;
			phone: string;
			email: string;
			pastoral_team: string[];
		};
	};

	type Gender = "male" | "female";

	type MinistryAccount = {
		name?: string;
		_id: string;
		CYC_ID: number;
		full_name?: string;
		username: string;
		email: string;
		password: string;
		role: string;
		ministry: MinistryTeam[] | string;
		position: Position;
		recent_login: EpochTimeStamp;
		education:
			| {
					msj1: {
						created?: EpochTimeStamp;
						updated?: EpochTimeStamp;
						status: EducationStatus;
					};
					msj2: {
						created?: EpochTimeStamp;
						updated?: EpochTimeStamp;
						status: EducationStatus;
					};
					msj3: {
						created?: EpochTimeStamp;
						updated?: EpochTimeStamp;
						status: EducationStatus;
					};
			  }
			| string;
		info?: {
			ministry: string[];
			name: string;
			phone: string;
			email: string;
			pastoral_team: string[];
		};
		leader_retreat: {
			year: string;
			status: string;
			paid: {
				confirmed: {
					status: boolean;
					timestamp: EpochTimeStamp;
				};
				uploaded: {
					timestamp: EpochTimeStamp;
					url?: string;
					status: boolean;
				};
			};
			deleted: {
				timestamp: EpochTimeStamp;
				reason: string;
			};
		};
	};

	type LeadersRetreatRecord = {
		_id: string;
		email: string;
		password: string;
		username: string;
		given_name: string;
		full_name?: string;
		family_name: string;
		name: string;
		gender: Gender;
		ic_number: string;
		phone_number: string;
		nickname: string;
		picture?: string;
		cg_id: number;
		CYC_ID: number;
		created: EpochTimeStamp;
		leader_retreat: {
			year: string;
			status: string;
			paid: {
				confirmed: {
					status: boolean;
					timestamp: EpochTimeStamp;
				};
				uploaded: {
					timestamp: EpochTimeStamp;
					url?: string;
					status: boolean;
				};
			};
			deleted: {
				timestamp: EpochTimeStamp;
				reason: string;
			};
		};
	};

	type BreadcrumbLinks = {
		link?: string;
		name: string;
	};

	type SeatsConfig = {
		broken: string[];
		col: number;
		row: number;
	};

	type CGL = User & {
		new_members?: Omit<User, "_id" | "leader_retreat">[];
	};

	type User = {
		_id?: string;
		full_name?: string;
		username: string;
		email: string;
		CYC_ID: number;
		password: string;
		role: string;
		picture?: string;
		created: EpochTimeStamp;
		position: Position;
		ministry: MinistryTeam[];
		cg_id?: string;
		given_name?: string;
		family_name?: string;
		name?: string;
		gender?: Gender;
		ic_number?: string;
		phone_number?: string;
		nickname?: string;
		leader_retreat?: {
			year: string;
			status: string;
			paid?: {
				confirmed: {
					status: boolean;
					timestamp: EpochTimeStamp;
				};
				uploaded: {
					timestamp: EpochTimeStamp;
					url?: string;
					status: boolean;
				};
			};
			deleted?: {
				timestamp: EpochTimeStamp;
				reason: string;
			};
		};
		recent_login: EpochTimeStamp;
	};
}
