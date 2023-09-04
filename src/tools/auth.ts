import { getReq, putReq } from "./requests.ts";
import { get, set } from "idb-keyval";
import { getTimeStamp } from "./datetime.ts";

export async function getStaffInfoFromDB(CYC_ID: string, password: string) {
	return await getReq("/auth?CYC_ID=" + CYC_ID + "&password=" + password);
}

export async function login(
	CYC_ID: string,
	password: string,
	rememberMe?: boolean,
) {
	const res = await getStaffInfoFromDB(CYC_ID, password); // 1. get data from server

	if (res.status) {
		res.data.login_status = true;
		const store = await setStaffInfoLocal(res.data); // 2. set login status and store data to local

		if (rememberMe) await updateRecentLogin();

		if (store) {
			window.location.href = "/";
			return true;
		} else {
			console.log("store failed");
			return false;
		}
	} else {
		return false;
	}
}

export function getAccAndPsw() {
	const res = JSON.parse(localStorage.getItem("cyc-acc") ?? "");
	if (res) {
		const CYC_ID = parseInt(res[0]);
		const password = res[1];
		return [CYC_ID, password];
	}
	return [null, null];
}

export async function getUerName(CYC_ID: string) {
	const router = `/auth/names?CYC_ID=${CYC_ID}`;
	const res = await getReq(router);
	if (res.status) {
		if (res.data.username === null) {
			return res.data.full_name;
		} else {
			return res.data.username;
		}
	}
}

export async function getUserNameFromUserData() {
	const data = await getStaffInfoLocal();
	if (data.username === null) {
		return data.full_name;
	} else {
		return data.username;
	}
}

export async function ifStaffInfoLocalExist() {
	const res = await get("staff");
	return !!res;
}

export async function getLoginStatus() {
	const res = await get("staff");
	if (res) {
		return res.login_status;
	} else {
		return false;
	}
}

export async function setStaffInfoLocal(data?: User) {
	try {
		await set("staff", data);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export async function getStaffInfoLocal() {
	return await get("staff");
}

export async function updateStaffInfoLocal(data?: User) {
	if (!data) setStaffInfoLocal(undefined); //logout
	const old = await getStaffInfoLocal();
	const new_data = Object.assign(old, data);
	await setStaffInfoLocal(new_data);
}

export async function getRecentLogin() {
	const info = await getStaffInfoLocal();
	const CYC_ID = info.CYC_ID;
	const res = await getReq(`/auth/recent_login?CYC_ID=${CYC_ID}`);
	console.log(res);
}

export async function updateRecentLogin() {
	const info = await getStaffInfoLocal();
	const CYC_ID = info.CYC_ID;
	const res = await putReq(`/auth/recent_login?CYC_ID=${CYC_ID}`, {});
	console.log(res);
}

export async function getCurrentUserCYCID() {
	const info = await getStaffInfoLocal();
	return info.CYC_ID;
}

export async function ifCurrentUserIsSuperAdmin() {
	const info = await getStaffInfoLocal();
	if (info.role) {
		if (info.role === "super_admin") {
			return true;
		}
	}
	return false;
}

export async function getUsername() {
	const info = await getStaffInfoLocal();
	if (info.username) {
		return info.username;
	} else {
		return info.full_name;
	}
}

export async function getAvatarUrl() {
	const staff = await getStaffInfoLocal();
	const info = await getStaffInfoFromDB(staff.CYC_ID, staff.password);
	const timeStamps = getTimeStamp();
	// console.log(info)
	if (info.data.avatar) {
		return info.data.avatar + "?t=" + timeStamps;
	} else {
		return null;
	}
}
