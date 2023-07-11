export function getTotals(data) {
    let totalApplicants = data.length;
    let totalPending = 0;
    let totalPreAccepted = 0;
    let totalAccepted = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].application.status === "pending") {
            totalPending += 1;
        }
        if (data[i].application.status === "pre-accepted") {
            totalPreAccepted += 1;
        }
        if (data[i].application.status === "accepted") {
            totalAccepted += 1;
        }
    }
    // console.log(totalApplicants, totalPending, totalAccepted)
    return [totalApplicants, totalPending,totalPreAccepted ,totalAccepted]
}

// export function getPastoralTeamCount(data, index, field) {
//     let pastoral_team_count = 0;

//     for (let i = 0; i < data.length; i++) {
//         if (data[i].info.pastoral_team[index] === field) {
//             pastoral_team_count += 1;
//         }
//     }
//     return pastoral_team_count;
// }

export function getInfoCount(data, other, index, field) {
    let count = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].info[other][index] === field) {
            count += 1;
        }
    }

    return count;
}