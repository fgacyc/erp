import { getReq } from '../tools/requests.js';

let department = {
	people_experience: {
		people: ['usher', 'security'],
		general_affair: ['admin', 'lounge', 'shuttle'],
		technology: ['software development', 'project management'],
	},
	communication: {
		social_media: ['content creation', 'editorial'],
		design: ['graphic design', 'multimedia design'],
		photography: ['photography'],
	},
	creative: {
		production: [
			'stage management',
			'multimedia',
			'sound',
			'lighting',
			'translation',
		],
		arts: ['dance', 'fashion&image', 'drama'],
		worship: ['vocal', 'musician'],
	},
	wonderkids: {
		wonderkids: ['children minister'],
	},
};

export const department_options = [
	{
		value: 'people_experience',
		label: 'People Experience',
		children: [
			{
				value: 'people',
				label: 'People',
				children: [
					{
						value: 'usher',
						label: 'Usher',
					},
					{
						value: 'security',
						label: 'Security',
					},
				],
			},
			{
				value: 'general_affair',
				label: 'General Affair',
				children: [
					{
						value: 'admin',
						label: 'Admin',
					},
					{
						value: 'lounge',
						label: 'Lounge',
					},
					{
						value: 'shuttle',
						label: 'Shuttle',
					},
				],
			},
			{
				value: 'technology',
				label: 'Technology',
				children: [
					{
						value: 'software development',
						label: 'Software Development',
					},
					{
						value: 'project management',
						label: 'Project Management',
					},
				],
			},
		],
	},
	{
		value: 'creative',
		label: 'Creative',
		children: [
			{
				value: 'production',
				label: 'Production',
				children: [
					{
						value: 'stage management',
						label: 'Stage Management',
					},
					{
						value: 'multimedia',
						label: 'Multimedia',
					},
					{
						value: 'sound',
						label: 'Sound',
					},
					{
						value: 'lighting',
						label: 'Lighting',
					},
					{
						value: 'translation',
						label: 'Translation',
					},
				],
			},
			{
				value: 'arts',
				label: 'Arts',
				children: [
					{
						value: 'dance',
						label: 'Dance',
					},
					{
						value: 'fashion&image',
						label: 'Fashion & Image',
					},
					{
						value: 'drama',
						label: 'Drama',
					},
				],
			},
			{
				value: 'worship',
				label: 'Worship',
				children: [
					{
						value: 'musician',
						label: 'Musician',
					},
					{
						value: 'vocal',
						label: 'Vocal',
					},
				],
			},
		],
	},
	{
		value: 'communication',
		label: 'Communication',
		children: [
			{
				value: 'social_media',
				label: 'Social Media',
				children: [
					{
						value: 'content creation',
						label: 'Content Creation',
					},
					{
						value: 'editorial',
						label: 'Editorial',
					},
				],
			},
			{
				value: 'design',
				label: 'Design',
				children: [
					{
						value: 'graphic design',
						label: 'Graphic Design',
					},
					{
						value: 'multimedia design',
						label: 'Multimedia Design',
					},
				],
			},
			{
				value: 'photography',
				label: 'Photography',
				children: [
					{
						value: 'photography',
						label: 'Photography',
					},
				],
			},
		],
	},
	{
		value: 'wonderkids',
		label: 'Wonder Kids',
		children: [
			{
				value: 'wonderkids',
				label: 'Wonder Kids',
				children: [
					{
						value: 'children minister',
						label: 'Children Minister',
					},
				],
			},
		],
	},
];

export const ministry_roles = [
	{
		value: 'team_lead',
		label: 'Team Lead',
	},
	{
		value: 'department_head',
		label: 'Department Head',
	},
	{
		value: 'ministry_pic',
		label: 'Ministry PIC',
	},
];

export function findMinistryLabel(ministryArray) {
	let res = [];
	for (let item of department_options) {
		if (item.value === ministryArray[0]) {
			res.push(item.label);
			for (let child of item.children) {
				if (child.value === ministryArray[1]) {
					res.push(child.label);
					for (let grandchild of child.children) {
						if (grandchild.value === ministryArray[2]) {
							res.push(grandchild.label);
						}
					}
				}
			}
		}
	}
	return res;
}

export async function findInterviewsNames(interviewerCYCIDList) {
	let res = await getReq(
		`/interviewers/CYCIDList?list=${interviewerCYCIDList.join(',')}`,
	);
	let interviewerNames = [];
	if (res.status) {
		let data = res.data;
		for (let interviewer of data) {
			interviewerNames.push('@' + interviewer.full_name);
		}
		// console.log(interviewerNames)
		return interviewerNames.join(', ');
	}
	return '';
}
