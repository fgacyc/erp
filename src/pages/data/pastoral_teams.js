import {pastoral_team_options} from "./ministry_options.js";

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

let pastoral_team_options = [
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