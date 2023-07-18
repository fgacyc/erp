import {pad} from "../pages/Recruitment/InterviewPage/data.js";

export function getTimeStamp() {
    let timestamp = Date.now()
    return Math.floor(timestamp / 1000)
}

export  function getDateString(timestamp){
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
 export  function  formatTimerTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${pad(minutes)}:${pad(seconds)}`;
}


export function getRubberStampTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    let yearMonthDay = `${year}.${month}.${day}`;
    let hourMinuteSecond = `${hours}:${minutes}`;
    return [yearMonthDay,hourMinuteSecond]
}