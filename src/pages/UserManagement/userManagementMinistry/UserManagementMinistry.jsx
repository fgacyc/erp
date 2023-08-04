import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {Button, Space, Table} from "@arco-design/web-react";
import {IconPlus} from "@arco-design/web-react/icon";
import {useEffect, useState} from "react";
import {getReq} from "../../../tools/requests.js";

export  default function  UserManagementMinistry(){
    const breadcrumbItems = [
        {
            name: "Events",
            link: "/",
            clickable: false
        },
        {
            name: "Ministry management",
            link: "/users/ministry",
            clickable: true
        }
    ]

    const [data, setData] = useState([]);

    useEffect(() => {
        getReq("/ministries").then((res) => {
            if(res.status) setData(res.data);
        });
    }, []);


    const  columns = [
        {
            title: 'Name',
            dataIndex: 'full_name',
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
};