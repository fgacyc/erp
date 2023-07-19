import {get} from "idb-keyval";

export async function ifShowTimer(){
    let url = window.location.href;
    let ifInInterviewFromPage = url.indexOf("/recruitment_interview/") !== -1;

    if(!ifInInterviewFromPage) return false;

    let candidate = await get("current_candidate")
    if(!candidate) return false;
    return candidate.interview.status === false;
}