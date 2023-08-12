import { hostURL } from '../config';

type FormData = Record<string, unknown> | null;
type FetchMethod = 'POST' | 'PUT' | 'PATCH' | 'GET';
async function fetchRequest(method: FetchMethod, url: string, data?: FormData) {
	const options = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: data !== null ? JSON.stringify(data) : null,
	};

	const res = await fetch(hostURL + url, options);
	return await res.json();
}

export async function getReq(url: string) {
	return await fetchRequest('GET', url, null);
}

export async function postReq(url: string, data: FormData) {
	return await fetchRequest('POST', url, data);
}

export async function putReq(url: string, data?: FormData) {
	return await fetchRequest('PUT', url, data);
}

export async function patchReq(url: string, data: FormData) {
	return await fetchRequest('PATCH', url, data);
}

export async function deleteReq(url: string) {
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const res = await fetch(hostURL + url, options);
	return await res.json();
}
