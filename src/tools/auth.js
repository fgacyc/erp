import {getReq, putReq} from "./requests.js";
import {get, set} from "idb-keyval";

export async function login(CYC_ID, password,rememberMe){
    let router = "/auth";
    let res =  await getReq(router + "?CYC_ID=" + CYC_ID + "&password=" + password);  // 1. get data from server

    if (res.status){
        res.data.login_status = true;
        let store = await  setStaffInfoLocal(res.data); // 2. set login status and store data to local

        if (rememberMe) await updateRecentLogin();

        if (store){
            window.location.href = "/";
            return true
        }else{
            console.log("store failed")
            return false
        }
    }else{
        return false
    }
}


export function getAccAndPsw(){
    let res = JSON.parse(localStorage.getItem("cyc-acc"))
    if (res){
        let CYC_ID = parseInt(res[0]);
        let password = res[1];
        return [CYC_ID, password];
    }
    return  [null,null];
}

export async function getUerName(CYC_ID){
    let router = `/auth/names?CYC_ID=${CYC_ID}`;
    let res = await getReq(router);
    if(res.status){
        if(res.data.username === null){
            return res.data.full_name
        }else{
            return res.data.username
        }
    }
}


export async  function getUserNameFromUserData(){
    let data = await getStaffInfoLocal();
    if(data.username === null){
        return data.full_name
    }else{
        return data.username
    }
}

export async function ifStaffInfoLocalExist(){
    let res  = await  get('staff')
    return !!res;
}

export  async  function getLoginStatus(){
    let res  = await  get('staff')
    if (res){
        return res.login_status;
    }else{
        return false
    }
}

export  async  function setStaffInfoLocal(data){
    try {
        await set('staff', data)
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}

export  async  function getStaffInfoLocal(){
    return await get('staff');
}


export  async function updateStaffInfoLocal(data){
    let old = await getStaffInfoLocal();
    let new_data = Object.assign(old, data);
    await setStaffInfoLocal(new_data);
}

export  async function getRecentLogin(){
    let info = await getStaffInfoLocal();
    let CYC_ID = info.CYC_ID;
    let res =await getReq(`/auth/recent_login?CYC_ID=${CYC_ID}`)
    console.log(res)
}

export async function updateRecentLogin(){
    let info = await getStaffInfoLocal();
    let CYC_ID = info.CYC_ID;
    let res =await putReq(`/auth/recent_login?CYC_ID=${CYC_ID}`,{})
    console.log(res)
}

export async function getCurrentUserCYCID(){
    let info = await getStaffInfoLocal();
    return info.CYC_ID;
}

export async function ifCurrentUserIsSuperAdmin(){
    let info = await getStaffInfoLocal();
    if(info.role){
        if (info.role === "super_admin"){
            return true
        }
    }
    return   false;
}