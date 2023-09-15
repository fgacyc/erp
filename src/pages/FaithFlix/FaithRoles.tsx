import {Button, Table, TableColumnProps} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {IconDelete, IconEdit, IconPlus} from "@arco-design/web-react/icon";
import {AddNameAndDescModal} from "@/pages/FaithFlix/Modals/addNameAndDescModal.tsx";
import { getRoleGenreTag, VideoRole} from "@/pages/FaithFlix/data.ts";
import PubSub from "pubsub-js";


export  default function FaithRoles() {
    const columns: TableColumnProps[] = [
        {
            title: "ID",
            dataIndex: "role_id",
        },
        {
            title: "Name",
            dataIndex: "role_name",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        // {
        //     title: "Created At",
        //     dataIndex: "created_at",
        // },
        // {
        //     title: "Updated At",
        //     dataIndex: "updated_at",
        // },
        {
            title: "Operation",
            render: (_, record) => (
                <div className="flex flex-row">
                    <Button type="secondary" size="small" className="mr-2" icon={<IconEdit
                        onClick={() => setModalVisible(true)}
                    />}></Button>
                    <Button type="secondary" size="small" className="mr-2" icon={<IconDelete
                        onClick={() => {
                            console.log(record.credit_id);
                        }}
                    />}></Button>
                </div>
            )
        }
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [allData, setAllData] = useState<VideoRole[]>([]);

    function updateData(){
        getRoleGenreTag("roles").then((res) => {
            if(res.status){
                setAllData(res.data);
            }
        });
    }

    useEffect(() => {
        updateData();
        const subscription = PubSub.subscribe("updateRoles", () => {
            updateData();
        });
        return () => {
            PubSub.unsubscribe(subscription);
        };
    }, []);

    return (
        <>
            {/*<UIBreadcrumb items={breadcrumbItems} />*/}
            <div className="app-component full-screen-app-component p-5">
                <div className={"flex flex-row justify-between mb-3"}>
                    <Button type="secondary" icon={<IconPlus />}
                            onClick={() => setModalVisible(true)}
                            className={"mr-3"}
                    >Add Video Roles</Button>
                </div>
                <Table columns={columns} data={allData}
                       //loading={loadingVisible}
                />
            </div>
            <AddNameAndDescModal visible={modalVisible} setVisible={setModalVisible} modalTitle="Roles"  />
        </>
    );
}
