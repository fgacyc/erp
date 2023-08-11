import {updateStaffInfoLocal} from "../../../tools/auth.js";
export  function logout(){
    updateStaffInfoLocal({login_status: false}).then((res)=>{
        // /login
        window.location.href = "/login";
    })
}


export function goToProfile(){
    window.location.href = "/profile";
}