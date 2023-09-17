import React, {useEffect, useState} from "react";
import {Button, Image, Message, Table, TableColumnProps} from "@arco-design/web-react";
import {deleteReq, getReq} from "@/tools/requests.ts";
import {IconDelete, IconEdit, IconEye, IconPlus} from "@arco-design/web-react/icon";
import {AddBillboardsModal} from "@/components/UI_Modal/UI_FaithFlixModals/AddBillboardsModal.tsx";
import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";


interface  BillboardData {
    key: string;
    billboard_id: number;
    genre_tag_id: number;
    title: string;
    description: string;
    cover_url: string;
    video_id: number;
    sync_mode: boolean;
    created_at: string;
    updated_at: string;
}

export  default function BillboardManagement() {
    const [allData, setAllData] = useState<BillboardData[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentVideoCoverURL, setCurrentVideoCoverURL] = useState<string>("");
    const [visible, setVisible] = React.useState(false);


    const columns: TableColumnProps[] = [
        {
            title: "Genre",
            dataIndex: "tag_name",
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Cover",
            render: (_, record) => {
                return (
                    <img src={record.cover_url} alt={record.title} className={"w-20 h-12 object-cover cursor-pointer"}
                         onClick={() => {
                             // setCurrentVideoCoverURL(text);
                             // setVisible(true);
                         }}
                    />
                );
            },
        },
        {
          title: "Options",
            render: (_, record) => {
                return (
                    <div className={"flex flex-row justify-start "}>
                        <Button type="secondary" className="mr-2"
                                icon={<IconEye
                                    onClick={() => {
                                        //setShowModal(true);
                                    }}
                                />}
                        ></Button>
                        <Button type="secondary" className="mr-2"
                                icon={<IconEdit
                                    onClick={() => {
                                        console.log(record);
                                    }}
                                />}
                        ></Button>
                        <Button type="secondary" className="mr-2"
                                icon={<IconDelete
                                    onClick={() => {
                                        handleDelete(record.billboard_id);
                                    }}
                                />}
                        ></Button>
                    </div>
                );
            },
        }
    ];
    function  updateBillboardData(){
        getReq("billboards").then((res)=>{
            if(res.status){
                setAllData(res.data);
            }
        });
    }

    useEffect(() => {
        updateBillboardData();
        const subscription = PubSub.subscribe("showBillBoardVideoCover", (_, data) => {
            setCurrentVideoCoverURL(data.message);
            setVisible(true);
        });
        const subscription1 = PubSub.subscribe("updateBillboardsData", () => {
            updateBillboardData();
        });
        return ()=>{
            PubSub.unsubscribe(subscription);
            PubSub.unsubscribe(subscription1);
        };
    }, []);

    function  handleDelete(id:number){
        const deleteSec = ()=>{
            deleteReq(`billboards?billboard_id=${id}`).then((res)=>{
                if(res.status){
                    Message.success("Delete successfully");
                    updateBillboardData();
                }else {
                    Message.warning("Delete failed");
                }
            });
        };

        UI_ConfirmModal(
            "Delete",
            "Are you sure you want to delete this billboard?",
            deleteSec
        );
    }


    return (
        <>
            {/*<UIBreadcrumb items={breadcrumbItems} />*/}
            <div className="app-component full-screen-app-component p-5">
                <div className={"flex flex-row justify-between mb-3"}>
                    <div>
                        <Button type="secondary" icon={<IconPlus />}
                                onClick={() => setShowModal(true)}
                                className={"mr-3"}
                        >Add Billboard</Button>
                    </div>
                </div>
                <Table columns={columns} data={allData}
                    //loading={loadingVisible}
                />
                <AddBillboardsModal visible={showModal} setVisible={setShowModal} />
            </div>
            <Image.Preview
                src={currentVideoCoverURL}
                visible={visible}
                onVisibleChange={setVisible}
            />
        </>
    );
}
