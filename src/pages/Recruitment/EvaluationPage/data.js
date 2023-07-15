import {filterByPermission, getAppointTimes} from "../InterviewPage/data.js";

export async function filterEvaluationData(data) {
    data =await filterByPermission(data);
    let dataFilter = [];
    for (let item of data) {
        if (item.interview.status ===  true) {
            dataFilter.push(item);
        }
    }
    // console.log(dataFilter)
    return dataFilter;
}

function calculateDateTimeFilterData(data){
    let dateStrings = [];
    for (let item of data) {
        let dateStr = getAppointTimes(item);
        if (dateStr === "N/A") continue;
        if (!dateStrings.includes(dateStr)) {
            dateStrings.push(dateStr);
        }
    }
    return dateStrings;
}


function  convertFilterDataForm(data){
    let filterData = [];
    for (let item of data){
        filterData.push({
            text: item,
            value: item
        })
    }
    return filterData;
}

export function getDateTimeFilterData(data){
    return convertFilterDataForm(calculateDateTimeFilterData(data));
}