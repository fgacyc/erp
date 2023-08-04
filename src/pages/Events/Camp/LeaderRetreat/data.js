export  function  getPaymentStatus(record){
    if(!record.leader_retreat) return "not registered";

    if(record.leader_retreat.paid.confirmed.status === true) return "confirmed";

    if(record.leader_retreat.paid.uploaded.status === true) return "uploaded";

    return "pending";
}