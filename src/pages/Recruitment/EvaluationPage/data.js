export function filterEvaluationData(data) {
    let dataFilter = []
    for (let item of data) {
        if (item.interview.status ===  true) {
            dataFilter.push(item);
        }
    }
    // console.log(dataFilter)
    return dataFilter;
}