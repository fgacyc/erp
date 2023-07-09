import {getReq} from "./requests.js";

export async function login(CYC_ID, password){
    let router = "/auth";
    return  await getReq(router + "?CYC_ID=" + CYC_ID + "&password=" + password);
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

