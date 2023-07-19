import {getReq} from "./requests.js";

export async function getAllUsers(){
    let url =   "/recruiters?accountModal=admin&password=admin";
    return  await getReq(url);
}