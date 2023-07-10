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

export  function getUserNameFromUserData(res){
   if (res.status){
       if(res.data.username === null){
           return res.data.full_name
       }else{
           return res.data.username
       }
   }
}

export  function getUserNameFromUserData1(data){
    if(data.username === null){
        return data.full_name
    }else{
        return data.username
    }
}
