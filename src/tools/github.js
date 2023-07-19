import { Octokit, App } from "https://esm.sh/octokit";

export async function sendAIssue(title,body,type){
    const octokit = new Octokit({
        auth: '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'
    })

    return await octokit.request('POST /repos/yuenci/CYC-ENTS/issues', {
        // owner: 'yuenci',
        repo: 'CYC-ENTS',
        title: title,
        body: body,
        // assignees: [
        //     'yuenci'
        // ],
        // milestone: 1,
        labels: [
            type
        ],
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}