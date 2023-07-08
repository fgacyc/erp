import {getReq} from "./requests.js";

export async function login(CYC_ID, password){
    let router = "/dev/auth";
    return  await getReq(router + "?CYC_ID=" + CYC_ID + "&password=" + password);
}