export function  getTotals(data){
    let totalApplicants = data.length;
    let totalPending = 0;
    let totalAccepted = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].application.status === "pending"){
            totalPending += 1;
        }
        if (data[i].application.status === "accepted"){
            totalAccepted += 1;
        }
    }
    // console.log(totalApplicants, totalPending, totalAccepted)
    return [totalApplicants, totalPending, totalAccepted]
}