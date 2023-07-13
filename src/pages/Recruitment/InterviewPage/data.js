import {getStaffInfoLocal} from "../../../tools/auth.js";

export async function filterDataHaveAppoint(data){
    data = await filterByPermission(data)
    let result = [];
    for(let i=0;i<data.length;i++){
        if(data[i].appointment){
            data[i].key = i;
            result.push(data[i]);
        }
    }
    //console.log(result)
    return  result;
}

export async function  filterByPermission(data){
    let staff = await getStaffInfoLocal();
    if ( staff.role === "super_admin" ){
        return data;
    }

    let scope = staff.ministry[0].scope;
    let result = [];
    for(let i=0;i<data.length;i++){
        let ministry = data[i].info.ministry[2];
        if (scope.includes(ministry)) {
            result.push(data[i]);
        }
    }
    // console.log(result)
    return result
}

const appointmentTimes = {
    general: [
        { value: "1689418800", label: "15/7/2023 (Sat) 7pm" },
        { value: "1689492600", label: "16/7/2023 (Sun) 3.30pm" },
        { value: "1690018200", label: "22/7/2023 (Sat) 5.30pm" },
    ],
    dance: [
        { value: "1689998400", label: "22/7/2023 (Sat) 12pm" },
        { value: "1690099200", label: "23/7/2023 (Sun) 4pm" },
    ],
};

export function getAppointmentTimesString(value){
    if(!value) return ;

    value = value.toString();
    let general = appointmentTimes.general;
    let dance = appointmentTimes.dance;

    for(let i=0;i<general.length;i++){
        if(general[i].value === value){
            return general[i].label
        }
    }

    for(let i=0;i<dance.length;i++){
        if(dance[i].value === value){
            return dance[i].label
        }
    }
}

export function  getAppointTimes(record) {
    let timestamp = record.appointment.ministry.appointment_time * 1000;

    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedTime;
}