export function formatData(data){
    let newData = [...data];
    for (let cgl of data){
        cgl.role = "CGL";
        if(cgl.new_members){
            for (let member of cgl.new_members){
                if (member.email !== cgl.email){
                    newData.push(member);
                }
            }
        }
    }
    return newData;
}