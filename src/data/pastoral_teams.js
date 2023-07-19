

let pastoral_teams = {
    "wonderkids": [
        "wonderkids"
    ],
    "young_warrior": [
        "heart",
        "move",
        "force",
        "voice",
        "mind"
    ],
    "general_service": [
        "yp_zone",
        "pro_family",
        "young_dreamer",
        "joshua_zone"
    ],
    "others":[
        "serdang",
        "kepong",
        "usj",
        "setapak",
        "sg_long",
        "seremban",
    ]
}

export  const pastoral_team_options = [
    {
        value:"wonderkids",
        label:"Wonder Kids",
        children: [
            {
                value:"wonderkids",
                label:"Wonder Kids"
            }
        ]
    },
    {
        value:"young_warrior",
        label:"Young Warrior",
        children: [
            {
                value:"heart",
                label:"Heart"
            },
            {
                value:"move",
                label:"Move"
            },
            {
                value:"force",
                label:"Force"
            },
            {
                value:"voice",
                label:"Voice"
            },
            {
                value:"mind",
                label:"Mind"
            }
        ]
    },
    {
        value:"general_service",
        label:"General Service",
        children: [
            {
                value:"yp_zone",
                label:"YP Zone"
            },
            {
                value:"pro_family",
                label:"Pro Family"
            },
            {
                value:"young_dreamer",
                label:"Young Dreamer"
            },
            {
                value:"joshua_zone",
                label:"Joshua Zone"
            }
        ]
    },
    {
        value:"others",
        label:"Others",
        children: [
            {
                value: "serdang",
                label: "Serdang"
            },
            {
                value: "kepong",
                label: "Kepong"
            },
            {
                value: "usj",
                label: "USJ"
            },
            {
                value: "setapak",
                label: "Setapak"
            },
            {
                value: "sg_long",
                label: "Sg Long"
            },
            {
                value: "seremban",
                label: "Seremban"
            }
        ]
    }
];


export  const pastoral_team_roles = [
    {
        value:"pastoral_team_leader",
        label:"Pastoral Team Leader"
    },
    {
        value:"pastoral_zone_leader",
        label:"Pastoral Zone Leader"
    },
    {
        value:"pastoral_team_member",
        label:"Pastoral Team Member"
    }
]

export function findPastoralTeam(name){
    name = name.toLowerCase();
    let team = "";
    let zone = "";

    for (let key in pastoral_teams){
        if (pastoral_teams[key].includes(name)){
            team = key;
            zone = name;
            break;
        }
    }
    return [team, zone];
}


export function findPastoralTeamLabel(pastoralTeamList){
    let res =[]
    for (let item of pastoral_team_options){
        if (item.value === pastoralTeamList[0]){
            res.push(item.label);
            for (let child of item.children){
                if (child.value === pastoralTeamList[1]){
                    res.push(child.label);
                    break;
                }
            }
        }
    }
    return res;
}