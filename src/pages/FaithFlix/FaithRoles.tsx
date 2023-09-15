import {Button, Message, Table, TableColumnProps} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {IconDelete, IconEdit, IconPlus} from "@arco-design/web-react/icon";
import {AddNameAndDescModal} from "@/components/UI_Modal/UI_FaithFlixModals/addNameAndDescModal.tsx";
import {deleteRoleGenreTag, getRoleGenreTag, VideoRole} from "@/pages/FaithFlix/data.ts";
import PubSub from "pubsub-js";
import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";
import {useAddRoleModalStore} from "@/components/UI_Modal/UI_FaithFlixModals/stores/addNameAndDescStore.ts";


export  default function FaithRoles() {
    const columns: TableColumnProps[] = [
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
                        onClick={() => {
                            setModalVisible(true);
                            setRoleData(record);
                        }}
                    />}></Button>
                    <Button type="secondary" size="small" className="mr-2" icon={<IconDelete
                        onClick={() => {
                            deleteData(record.role_id);
                        }}
                    />}></Button>
                </div>
            )
        }
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [allData, setAllData] = useState<VideoRole[]>([]);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const setRoleData = useAddRoleModalStore((state) => state.setRoleData);

    function updateData(){
        setLoadingVisible(true);
        getRoleGenreTag("roles").then((res) => {
            if(res.status){
                setAllData(res.data);
                setLoadingVisible(false);
            }
        });
    }

    function deleteData(id:number){
        const deleteRole = async () => {
            const res = await  deleteRoleGenreTag("roles",id);
            if(res.status) {
                updateData();
                Message.success("Delete Role Success");
            }
        };

        UI_ConfirmModal(
            "Delete Role",
            "Are you sure you want to delete this Role?",
            deleteRole
        );
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
                       loading={loadingVisible}
                />
            </div>
            <AddNameAndDescModal visible={modalVisible} setVisible={setModalVisible} modalTitle="Roles"  />
        </>
    );
}
