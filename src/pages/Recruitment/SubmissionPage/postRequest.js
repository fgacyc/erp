
import {postReq} from "/src/tools/requests.js";

export default async function postRecruiter(name, phone, email, pastoral_team, department1){
    const router = "/recruiter"
    let data = {
        "name": name,
        "phone": phone,
        "email": email,
        "pastoral_team": pastoral_team,
        "ministry": department1,
    }
    console.log(data)

    let res = await postReq(router, data)
    console.log(res)
}