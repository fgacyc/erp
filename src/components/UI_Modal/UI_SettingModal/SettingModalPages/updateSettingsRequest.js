import {putReq} from "../../../../tools/requests.js";
import {getCurrentUserCYCID} from "../../../../tools/auth.js";

export async function updateSettingsRequest(type, data) {
    let payload = {
        type: type,
        data: data
    }
    let CYC_ID = await getCurrentUserCYCID();
    try {
        let res = await putReq(`/settings/${CYC_ID}`, payload);
        console.log(res)
        return res;
    }catch (e) {
        console.log(e);
        return e;
    }
}