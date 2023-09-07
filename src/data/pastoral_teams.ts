export const pastoral_teams: {
	[key: string]: string[];
} = {
	wonderkids: ["wonderkids"],
	young_warrior: ["heart", "move", "force", "voice", "mind"],
	general_service: ["yp_zone", "pro_family", "young_dreamer", "joshua_zone"],
	others: [
		"serdang",
		"kepong",
		"usj",
		"setapak",
		"sg_long",
		"seremban",
		"the_blessing",
		"to_be_confirmed",
	],
};

export const pastoral_team_options = [
	{
		value: "wonderkids",
		label: "Wonder Kids",
		children: [
			{
				value: "wonderkids",
				label: "Wonder Kids",
			},
		],
	},
	{
		value: "young_warrior",
		label: "Young Warrior",
		children: [
			{
				value: "heart",
				label: "Heart",
			},
			{
				value: "move",
				label: "Move",
			},
			{
				value: "force",
				label: "Force",
			},
			{
				value: "voice",
				label: "Voice",
			},
			{
				value: "mind",
				label: "Mind",
			},
		],
	},
	{
		value: "general_service",
		label: "General Service",
		children: [
			{
				value: "yp_zone",
				label: "YP Zone",
			},
			{
				value: "pro_family",
				label: "Pro Family",
			},
			{
				value: "young_dreamer",
				label: "Young Dreamer",
			},
			{
				value: "joshua_zone",
				label: "Joshua Zone",
			},
		],
	},
	{
		value: "others",
		label: "Others",
		children: [
			{
				value: "serdang",
				label: "Serdang",
			},
			{
				value: "kepong",
				label: "Kepong",
			},
			{
				value: "usj",
				label: "USJ",
			},
			{
				value: "setapak",
				label: "Setapak",
			},
			{
				value: "sg_long",
				label: "Sg Long",
			},
			{
				value: "seremban",
				label: "Seremban",
			},
			{
				value: "the_blessing",
				label: "The Blessing",
			},
			{
				value: "to_be_confirmed",
				label: "To Be Confirmed",
			},
		],
	},
];

export const pastoral_team_roles = [
	{
		value: "pastoral_zone_leader",
		label: "Pastoral Zone Leader",
	},
	{
		value: "pastoral_team_leader",
		label: "Pastoral Team Leader",
	},
	{
		value: "pastoral_team_admin",
		label: "Pastoral Team Admin",
	},
	{
		value: "senior_cg_leader",
		label: "Senior CG Leader",
	},
	{
		value: "cg_leader",
		label: "CG Leader",
	},
];

// export function findPastoralTeam(name: string) {
// 	name = name.toLowerCase();
// 	let team = '';
// 	let zone = '';

// 	for (const key in pastoral_teams) {
// 		if (pastoral_teams[key].includes(name)) {
// 			team = key;
// 			zone = name;
// 			break;
// 		}
// 	}
// 	return [team, zone];
// }

export const findPastoralTeamLabel = (pastoralTeamList: string[]) => {
	const res = [];
	for (const item of pastoral_team_options) {
		if (item.value === pastoralTeamList[0]) {
			res.push(item.label);
			for (const child of item.children) {
				if (child.value === pastoralTeamList[1]) {
					res.push(child.label);
					break;
				}
			}
		}
	}
	return res;
};
