import UI_Breadcrumb from "../../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {Button, Space, Table} from "@arco-design/web-react";
import {IconDelete, IconPlus} from "@arco-design/web-react/icon";
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
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    useEffect(() => {
        getReq("/leader_retreat").then((res) => {
            if(res.status) setData(addKeys(res.data));
        });
    }, []);


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
                    <Button type='secondary' icon={<IconDelete />}
                            onClick={() => console.log("delete")}
                    ></Button>
                </Space>
                <Table columns={columns} data={data}
                       renderPagination={(paginationNode) => (
                           <div
                               style={{
                                   display: 'flex',
                                   justifyContent: 'space-between',
                                   marginTop: 10,
                               }}
                           >
                               <Space style={{marginLeft:16}}>
                                   { data
                                       ?<span>{data.length} Items</span>
                                       :<span>0 items</span>
                                   }
                               </Space>
                               {paginationNode}
                           </div>)}
                />
            </div>
            <UI_DeleteEventParticipantModal visible={deleteModalVisible} setVisible={setDeleteModalVisible}/>
        </>
    )
}