import {Avatar, Table, TableColumnProps} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {getReq} from "@/tools/requests.ts";

export  default function FaithUsers() {
    const [allData, setAllData] = useState([]);


    const columns: TableColumnProps[] = [
        {
            title: "Name",
            render: (_, record) => {
                return (
                    <div className="flex flex-row items-center">
                        <Avatar size={32}>
                            <img
                                alt='avatar'
                                src={record.avatar_url}
                            />
                        </Avatar>
                        <div className="ml-2">{record.username}</div>
                    </div>
                );
            }
        },
        {
            title: "language",
            dataIndex: "language",
        },
        {
            title: "Recent Login",
            dataIndex: "last_login_timestamp",
        },
        {
            title: "created_at",
            dataIndex: "created_at",
        },
    ];


    useEffect(() => {
        getReq("users").then((res)=>{
            if(res.status){
                console.log(res.data);
                setAllData(res.data);
            }
        });
    }, []);


    return (
        <>
            {/*<UIBreadcrumb items={breadcrumbItems} />*/}
            <div className="app-component full-screen-app-component p-5">
                <Table columns={columns} data={allData}
                    //loading={loadingVisible}
                />
            </div>
        </>
    );
}
