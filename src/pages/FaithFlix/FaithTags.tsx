import {Button, Message, Table, TableColumnProps} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {IconDelete, IconEdit, IconPlus} from "@arco-design/web-react/icon";
import {AddNameAndDescModal} from "@/pages/FaithFlix/Modals/addNameAndDescModal.tsx";
import {deleteRoleGenreTag, GenreTag, getRoleGenreTag} from "@/pages/FaithFlix/data.ts";
import PubSub from "pubsub-js";
import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";


export  default function FaithTags() {
    const columns: TableColumnProps[] = [
        {
            title: "Name",
            dataIndex: "tag_name",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Operation",
            render: (_, record) => (
                <div className="flex flex-row">
                    <Button type="secondary" size="small" className="mr-2" icon={<IconEdit
                        onClick={() => setModalVisible(true)}
                    />}></Button>
                    <Button type="secondary" size="small" className="mr-2" icon={<IconDelete
                        onClick={() => {
                            deleteData(record.tag_id);
                        }}
                    />}></Button>
                </div>
            )
        }
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [allData, setAllData] = useState<GenreTag[]>([]);


    function updateData(){
        getRoleGenreTag("genres").then((res) => {
            if(res.status){
                const genresData = res.data.filter((item:GenreTag) => item.type === "tag");
                setAllData(genresData);
            }
        });
    }

    function deleteData(id:number){
        const deleteTag = async () => {
            const res = await  deleteRoleGenreTag("tags",id);
            // console.log(res);
            if(res.status) {
                updateData();
                Message.success("Delete tag Success");
            }
        };

        UI_ConfirmModal(
            "Delete tag",
            "Are you sure you want to delete this tag?",
            deleteTag
        );
    }

    useEffect(() => {
        updateData();
        const subscription = PubSub.subscribe("updateTags", () => {
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
                    >Add Video Tags</Button>
                </div>
                <Table columns={columns} data={allData}
                    //loading={loadingVisible}
                />
            </div>
            <AddNameAndDescModal visible={modalVisible} setVisible={setModalVisible} modalTitle="Tags"  />
        </>
    );
}
