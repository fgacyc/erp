import {getStaffInfoLocal} from "../../tools/auth.js";

export async function menuPermission(){
    let staff  = await getStaffInfoLocal();
    let permission = {};
    permission = recruitmentItemsPermission(staff,permission);
    // console.log(permission);
    return  permission;

}



function recruitmentItemsPermission(staff,permission) {
    permission = {
        ...permission,
        "recruitment_dashboard": true,
        "recruitment_add_candidate": true
    }

    if (staff.role === "super_admin") {
        permission.recruitment_pre_screening = true;
        permission.recruitment_interview = true;
        permission.recruitment_evaluation = true;
        return permission;
    }

    if("position" in staff){
        if(staff.position.level === "pastoral_team_leader" || staff.position.level === "pastoral_zone_leader"){ // pastoral team leader or pastoral zone leader
            if(staff.hasOwnProperty("ministry") && staff.ministry.length >0 && staff.ministry[0].ministry === "interviewer"){ //interviewer
                permission.recruitment_pre_screening = true;
                permission.recruitment_interview = true;
                permission.recruitment_evaluation = true;
                return permission;
            }
        }
    }

    if("position" in staff){
        if (Object.keys(staff.position).length === 0) { //no position
            permission.recruitment_pre_screening = false;
            permission.recruitment_interview = false;
            permission.recruitment_evaluation = false;
            return permission;
        }else if (staff.position.level === "pastoral_team_leader" || staff.position.level === "pastoral_zone_leader") { //pastoral team leader or pastoral zone leader
            permission.recruitment_pre_screening = true;
            permission.recruitment_interview = false;
            permission.recruitment_evaluation = false;
            return permission;
        }
    }


    if (staff.ministry.length === 0) { //no ministry
        permission.recruitment_pre_screening = false;
        permission.recruitment_interview = false;
        permission.recruitment_evaluation = false;
        return permission;
    }
    else if (staff.ministry[0].ministry === "interviewer") { //interviewer
        permission.recruitment_pre_screening = false;
        permission.recruitment_interview = true;
        permission.recruitment_evaluation = true;
        return permission;
    }
}