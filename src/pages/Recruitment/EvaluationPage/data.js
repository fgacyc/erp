export function filterEvaluationData(data) {
    let dataFilter = []
    for (let item of data) {
        if (item.interview.ministry.questions !== null) {
            dataFilter.push(item);
        }
    }
    // console.log(dataFilter)
    return dataFilter;
}