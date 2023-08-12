import { get } from 'idb-keyval';

export async function ifShowTimer() {
	const url = window.location.href;
	const ifInInterviewFromPage = url.indexOf('/recruitment_interview/') !== -1;

	if (!ifInInterviewFromPage) return false;

	const candidate = await get('current_candidate');
	if (!candidate) return false;
	return candidate.interview.status === false;
}
