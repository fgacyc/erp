import { Octokit } from 'octokit';

const sendAiIssue = async (
	title: string,
	body: string,
	type: 'bug' | 'enhancement',
) => {
	const octokit = new Octokit({
		auth: import.meta.env['VITE_GITHUB_AUTH_TOKEN'],
	});
	// TODO: Change repo link?
	return await octokit.request('POST /repos/yuenci/CYC-ENTS/issues', {
		// owner: 'yuenci',
		repo: 'CYC-ENTS',
		title: title,
		body: body,
		// assignees: [
		//     'yuenci'
		// ],
		// milestone: 1,
		labels: [type],
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
	});
};
export default sendAiIssue;
