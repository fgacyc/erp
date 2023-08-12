import { pad } from '../pages/Recruitment/InterviewPage/data.js';

export function getTimeStamp() {
	const timestamp = Date.now();
	return Math.floor(timestamp / 1000);
}

export function getYMDHMS(dateObj: Date) {
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	const day = String(dateObj.getDate()).padStart(2, '0');
	const hours = String(dateObj.getHours()).padStart(2, '0');
	const minutes = String(dateObj.getMinutes()).padStart(2, '0');
	const seconds = String(dateObj.getSeconds()).padStart(2, '0');
	return [year, month, day, hours, minutes, seconds];
}

export function getDateString(timestamp: EpochTimeStamp) {
	const date = new Date(timestamp);
	const [year, month, day, hours, minutes, seconds] = getYMDHMS(date);

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getNowYYYYMMDDHHMMSS() {
	const date = new Date();
	const [year, month, day, hours, minutes, seconds] = getYMDHMS(date);

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatTimerTime(time: number) {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	return `${pad(minutes)}:${pad(seconds)}`;
}

export function getRubberStampTime(timestamp?: EpochTimeStamp) {
	let date;
	if (timestamp) {
		date = new Date(timestamp * 1000);
	} else {
		date = new Date();
	}

	const [year, month, day, hours, minutes] = getYMDHMS(date);

	const yearMonthDay = `${year}.${month}.${day}`;
	const hourMinuteSecond = `${hours}:${minutes}`;
	return [yearMonthDay, hourMinuteSecond];
}

export function date2TimeStamp(YYYYMMDDHHMMSS: string) {
	const date = new Date(YYYYMMDDHHMMSS);
	return date.getTime() / 1000;
}
