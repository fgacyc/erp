import {getStaffInfoLocal} from "./auth.js";

export function addKeys(array){
    return array.map((item, index) => {
        item.key = index;
        return item;
    })
}


export async function filterDataByPermissions(data){
    let staffInfo =await getStaffInfoLocal();
    let role = staffInfo.role;

    if (role === 'super_admin'){
        return data;
    }

    let position_level = staffInfo.position.level;
    let position_name = staffInfo.position.name;
    if(position_level === "pastoral_team_leader" && position_name === "young_warrior"){
        return data.filter(item => item.info.pastoral_team[0] === "young_warrior")
    }

    return data.filter(item => item.info.pastoral_team[1] === position_name[1])
}