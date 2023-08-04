import {Button, Space, Table} from "@arco-design/web-react";
import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {IconPlus} from "@arco-design/web-react/icon";
import {useEffect, useState} from "react";
import {getReq} from "../../../tools/requests.js";
import {formatData} from "./data.js";

export default function UserManagementPastoral() {
    const breadcrumbItems = [
        {
            name: "Events",
            link: "/",
            clickable: false
        },
        {
            name: "Pastoral management",
            link: "/users/pastoral",
            clickable: true
        }
    ]

    const [data, setData] = useState([]);

    useEffect(() => {
        getReq("/cgls").then((res) => {
            if(res.status) setData(formatData(res.data));
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
          title: "Role",
            dataIndex: "role"
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];


    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component full-screen-app-component">
                <Button type='primary' icon={<IconPlus />}
                        style={{"margin":"10px 0"}}
                >Register new</Button>
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
        </>
    )
}