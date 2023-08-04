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


export function  changeNameKeyAndID(record){
    for (let item of record){
        if(item.hasOwnProperty("full_name")){
            item["name"] = item.full_name;
        }
        if(item.hasOwnProperty(("info"))){
            item["name"] = item.info.name;
            item["ministry"] = item.info.ministry[2];
            item["role"] = "ministry member";
        }else{
            item["ministry"] = "";
        }
        if(!item.hasOwnProperty("CYC_ID")){
            item["CYC_ID"] = item._id;
        }

        if(item.hasOwnProperty("orientation")){
            item["education"] = "orientation";
        }else{
            item["education"] = "";
        }
    }
    return record;
}