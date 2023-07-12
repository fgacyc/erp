import {getStaffInfoLocal} from "../../tools/auth.js";

export async function  ifShowPreScreening(){
    let staff =await  getStaffInfoLocal();
    console.log(staff)

    return true;
}