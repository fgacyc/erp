import {pad} from "../pages/Recruitment/InterviewPage/data.js";

export function getTimeStamp() {
    let timestamp = Date.now()
    return Math.floor(timestamp / 1000)
}

export function getYMDHMS(dateObj) {
    let year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    return [year, month, day, hours, minutes, seconds]
}

export  function getDateString(timestamp){
    const date = new Date(timestamp);
    let [year, month, day, hours, minutes, seconds] = getYMDHMS(date)

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
 export  function  formatTimerTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${pad(minutes)}:${pad(seconds)}`;
}


export function getRubberStampTime(timestamp){
    let date;
    if (arguments.length === 0) {
        date = new Date();
    }else{
        date = new Date(timestamp *1000);
    }

    let [year, month, day, hours, minutes, seconds] = getYMDHMS(date)

    let yearMonthDay = `${year}.${month}.${day}`;
    let hourMinuteSecond = `${hours}:${minutes}`;
    return [yearMonthDay,hourMinuteSecond]
}