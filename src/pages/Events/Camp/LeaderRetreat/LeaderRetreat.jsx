import UI_Breadcrumb from "../../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {Button, Space, Table} from "@arco-design/web-react";
import {IconDelete, IconPlus, IconUserGroup} from "@arco-design/web-react/icon";
import {useEffect, useState} from "react";
import {getReq} from "../../../../tools/requests.js";
import {addKeys} from "../../../../tools/tableTools.js";
import {getPaymentStatus} from "./data.js";
import UI_DeleteEventParticipantModal
    from "../../../../components/UI_Modal/UI_DeleteEventParticipantModal/UI_DeleteEventParticipantModal.jsx";
import {set} from "idb-keyval";

export default function LeaderRetreat(){
    const breadcrumbItems = [
        {
            name: "Events",
            link: "/",
            clickable: false
        },
        {
            name: "Camp",
            link: "/events/camp",
            clickable: true
        },{
            name: "Leader Retreat",
            link: "/events/camp/leader_retreat",
        }
    ]

    const [data, setData] = useState([]);
    const [deletedData, setDeletedData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [current_display_type, setCurrentDisplayType] = useState("registered");

    useEffect(() => {
        initData().then((res) => {
            setData(res[0]);
            setDeletedData(res[1]);
            setDisplayData(res[0]);
        });
    }, []);

     async  function initData(){
         let resData;
        let res= await  getReq("/leader_retreat")
        if (res.status === true ){
            resData = addKeys(res.data)
        }
        let registeredData = resData.filter((item) => item.leader_retreat.status === "registered");
        let deletedData = resData.filter((item) => item.leader_retreat.status === "deleted");
        return [registeredData, deletedData]
    }

    async function displayDataToTable(type){
        if(type === "registered") {
            setDisplayData(data);
            setCurrentDisplayType("registered")
        }
        else if(type === "deleted") {
            setDisplayData(deletedData);
            setCurrentDisplayType("deleted")
        }
    }


    function deleteParticipant(CYC_ID){
         let deletedParticipant = data.filter((item) => item.CYC_ID === CYC_ID);
        let newData = data.filter((item) => item.CYC_ID !== CYC_ID);
        setData(newData);
        setDeletedData([...deletedData, ...deletedParticipant]);
    }


    const  columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'CYC ID',
            dataIndex: 'CYC_ID',
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: "Paid",
            dataIndex: "paid",
            render: (text, record) => (
                <div>
                    {getPaymentStatus(record) === "pending" && <span>Not yet</span>}
                    {getPaymentStatus(record) === "uploaded" && <span>Waiting Confirm</span>}
                    {getPaymentStatus(record) === "confirmed "&& <span>Confirmed</span>}
                </div>
            )
        },
        {
            title:"Operation",
            render: (text, record) => (
                <Space>
                    <Button type='secondary' icon={<IconDelete />}
                        onClick={() => deleteBtnHandler(record)}
                    ></Button>
                </Space>
            )
        }
    ];

    function  deleteBtnHandler(record){
        set("current_participant", record).then(() =>
            setDeleteModalVisible(true)
        );
    }


    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component full-screen-app-component">
                <Space>
                    <Button type='primary' icon={<IconPlus />}
                            style={{"margin":"10px 0"}}
                    >Register new</Button>
                    { current_display_type === "registered"
                        ? <Button type='secondary' icon={<IconDelete />}
                                  onClick={() => displayDataToTable("deleted")}
                        ></Button>
                        : <Button type='secondary' icon={<IconUserGroup />}
                                  onClick={() => displayDataToTable("registered")}
                        ></Button>

                    }
                </Space>
                <Table columns={columns} data={displayData}
                       renderPagination={(paginationNode) => (
                           <div
                               style={{
                                   display: 'flex',
                                   justifyContent: 'space-between',
                                   marginTop: 10,
                               }}
                           >
                               <Space style={{marginLeft:16}}>
                                   { displayData
                                       ?<span>{displayData.length} Items</span>
                                       :<span>0 items</span>
                                   }
                               </Space>
                               {paginationNode}
                           </div>)}
                />
            </div>
            <UI_DeleteEventParticipantModal visible={deleteModalVisible} setVisible={setDeleteModalVisible} deleteParticipant={deleteParticipant} />
        </>
    )
}