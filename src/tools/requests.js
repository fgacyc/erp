import {hostURL} from "./config.js";
async function fetchRequest(method,url,data){
    let options ={
        method : method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if(data !== null) options.body =  JSON.stringify(data)

    let res = await fetch(hostURL + url, options);
    return  await res.json()
}

export async function  getReq(url){
    return await fetchRequest("GET", url,null)
}

export async function postReq(url, data){
    return await fetchRequest("POST", url,data)
}


export async function putReq(url, data){
    return await fetchRequest("PUT", url,data)
}

export async function patchReq(url, data){
    return await fetchRequest("PATCH", url,data)
}

export async function deleteReq(url){
    return await fetchRequest("DELETE", url,null)
}