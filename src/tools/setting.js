import { update } from 'idb-keyval';
import {getStaffInfoLocal} from "./auth.js";

let setting = {
    "remember_me" : false,
}


export async function setRememberMeVal(val){
    setting.remember_me = val;
    // update local
    let staff = await getStaffInfoLocal();
    console.log(staff)
    staff.setting =  setting;
    await update('staff', staff);
    let staff1 = await getStaffInfoLocal();
    console.log(staff1)
}