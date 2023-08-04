export  function  getPaymentStatus(record){
    if(!record.leader_retreat) return "not registered";

    if(record.leader_retreat.paid.confirmed.status === true) return "confirmed";

    if(record.leader_retreat.paid.uploaded.status === true) return "uploaded";

    return "pending";
}

export function  changeNameKey(record){
    for (let item of record){
        if(item.hasOwnProperty("full_name")){
            item["name"] = item.full_name;
        }
    }
    return record;
}