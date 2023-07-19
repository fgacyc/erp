import {filterByPermission, getAppointTimes} from "../InterviewPage/data.js";

export function getPassStatus(record){
    let applicationStatus = record.application.status;
    if(applicationStatus === "accepted") return "accepted";
    else if(applicationStatus === "rejected") return "rejected";
    else if(applicationStatus === "kiv") return "kiv";
    else return "pending";
}

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

export function getAppoInsightData(data) {
    let appoInsightData = [];

    let dateStrings = calculateDateTimeFilterData(data);
    for (let dateStr of dateStrings) {
        let ministryCounts = {}; // Object to store counts for each ministry on the specific date

        for (let item of data) {
            let appointTime = getAppointTimes(item);
            if (appointTime === dateStr) {
                let ministry = item.info.ministry[2]; // Assuming "ministry" is a string or an identifier
                ministryCounts[ministry] = (ministryCounts[ministry] || 0) + 1;
            }
        }

        // Convert the ministryCounts object to an array of objects with "ministry" and "value" properties
        let ministriesData = Object.entries(ministryCounts).map(([ministry, count]) => ({
            ministry,
            value: count,
        }));

        appoInsightData.push({
            date: dateStr,
            ministries: ministriesData,
        });
    }
    return appoInsightData;
}


export function classifyQuestion(QAs){
    let res = {
        "general": [],
        "specific": [],
        "freeQ&As": []
    }

    for (let item of QAs){
        if (item.type === "general"){
            res.general.push(item);
        } else if (item.type === "freeQ&As"){
            res["freeQ&As"].push(item);
        } else {
            res.specific.push(item);
        }
    }
    return res;
}