import {filterByPermission} from "../InterviewPage/data.js";

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