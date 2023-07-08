import {hostURL} from "../../tools/config.js";
// import {getTimeStamp} from "../../tools/dateTime.js";
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
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    let res = await fetch(hostURL + router, options)
    let result = await res.json()
    console.log(result)
}