export  const options_bar_data = [
    {
        value: 'overall',
        label: 'Overall',

    },
    {
        value: 'wonderkids',
        label: 'Wonderkids',

    },
    {
        value: 'young_warrior',
        label: 'Young Warrior',

    },
    {
        value: 'general_service',
        label: 'General Service',

    },
    {
        value: 'others',
        label: 'Others',
    }
];


export  const options_pie_data = [
    {
        value: 'overall',
        label: 'Overall',

    },
    {
        value: 'people_experience',
        label: 'People Experience',
        children: [
            {
                value: 'people',
                label: 'People',
            },
            {
                value: 'general_affair',
                label: 'General Affair',
            },
            {
                value: 'technology',
                label: 'Technology',
            }
        ]
    },
    {
        value: 'creative',
        label: 'Creative',
        children: [
            {
                value: 'production',
                label: 'Production',
            },
            {
                value: 'arts',
                label: 'Arts',
            },
            {
                value: 'worship',
                label: 'Worship',
            }
        ]

    },
    {
        value: 'communication',
        label: 'Communication',
        children: [
            {
                value: 'social_media',
                label: 'Social Media',
            },
            {
                value: 'design',
                label: 'Design',
            },
            {
                value: 'photography',
                label: 'Photography',
            }
        ],

    },
    {
        value: 'wonderkids',
        label: 'Wonderkids',

    },
];


let color =["#D8E2DC", "#FFE5D9", "#FFCAD4", "#F4ACB7", "#9D8189",
    "#A8D8EA", "#FFAAA6", "#FF8C94", "#FF1D47", "#F28123",
    "#FFC90E", "#FFFF72", "#D1D075", "#C7EF86", "#7BE495"];

export  function  getPreScreeningRatio(usersData){
    let pending = 0;
    let pre_passed = 0;
    let per_rejected = 0

    for (let user of usersData){
        if(user.pre_screening.status === null) pending ++;
        else if (user.pre_screening.status === true) pre_passed ++;
        else if (user.pre_screening.status === false) per_rejected ++;
    }

    return {
        labels: ['Pending', 'Pre-Passed', 'Per_Rejected'],
        datasets: [
            {
                label: '# of Votes',
                data: [pending, pre_passed, per_rejected],
                backgroundColor: color,
                borderWidth: 1,
            },
        ],
    }
}

export function  getInterviewRatio(usersData){
    let notScheduled = 0;
    let scheduled = 0;
    let interviewed = 0;

    for (let user of usersData){
        if(!user.appointment  && user.application.status==="pre-accepted") notScheduled ++;
        else if (user.interview && user.interview.status === false) scheduled++;
        else if (user.interview && user.interview.status === true) interviewed++;
    }


    return {
        labels: ['Not Schedule', 'Waiting Interview', 'Interviewed'],
        datasets: [
            {
                label: '# of Votes',
                data: [notScheduled,scheduled,interviewed],
                backgroundColor: [color[2],color[1],color[0]],
                borderWidth: 1,
            },
        ],
    }
}

export function  getEvaluationRatio(usersData){
    let notEvaluation = 0;
    let nextTime = 0;
    let kiv = 0;
    let pass = 0;

    for (let user of usersData){
        // console.log(user.application.status)

        if(user.application.status === "rejected") nextTime ++;
        else if(user.application.status === "kiv") kiv ++;
        else if(user.application.status === "accepted") pass ++;
        else if((user.interview && user.interview.status === true)) notEvaluation ++;
    }
    // console.log(notEvaluation,nextTime,kiv,pass)

    return {
        labels: ['Not Evaluation', 'Next time', 'KIV',"Pass"],
        datasets: [
            {
                label: '# of Votes',
                data: [notEvaluation, nextTime,kiv,pass],
                backgroundColor:  [color[1],color[2],"#fff4cf",color[0]],
                borderWidth: 1,
            },
        ],
    }
}

export function getRecruiterRatio(usersData){
    let passed = 0;
    let rejected = 0;
    let KIV = 0;
    let all = usersData.length;

    for (let user of usersData){
        if(user.application.status === "rejected") rejected ++;
        else if(user.application.status === "accepted") passed ++;
        else if(user.application.status === "kiv") KIV ++;
    }
    let pending = all - passed - rejected - KIV;


    return {
        labels: ['Pending', 'Pass', 'KIV', 'Next time'],
        datasets: [
            {
                label: '# of Votes',
                data: [pending,passed, KIV, rejected],
                backgroundColor: [color[1],color[0],"#fff4cf",color[3]],
                borderWidth: 1,
            },
        ],
    };
}