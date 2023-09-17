import React, {useEffect, useState} from "react";
import {Button, Image, Message, Table, TableColumnProps} from "@arco-design/web-react";
import {deleteReq, getReq} from "@/tools/requests.ts";
import {IconDelete, IconEdit, IconPlus, IconSort} from "@arco-design/web-react/icon";
import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";
import AddSeriesModal from "@/components/UI_Modal/UI_FaithFlixModals/AddSeriesModal.tsx";
import {ExpandedRowRender, SeriesData} from "@/pages/FaithFlix/SeriesManagement.tsx";


// interface  BillboardData {
//     key: string;
//     billboard_id: number;
//     genre_tag_id: number;
//     title: string;
//     description: string;
//     cover_url: string;
//     video_id: number;
//     sync_mode: boolean;
//     created_at: string;
//     updated_at: string;
// }

export  default function SectionManagement() {
    const [allData, setAllData] = useState<SeriesData[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentVideoCoverURL, setCurrentVideoCoverURL] = useState<string>("");
    const [visible, setVisible] = React.useState(false);


    const columns: TableColumnProps[] = [
        {
            title: "Section Name",
            dataIndex: "section_name",
        },
        {
            title: "Section Description",
            dataIndex: "description",
        },
        {
            title: "Options",
            render: (_, record) => {
                return (
                    <div className={"flex flex-row justify-start "}>
                        <Button type="secondary" className="mr-2"
                                icon={<IconEdit
                                    onClick={() => {
                                        // handleEdit(record);
                                    }}
                                />}></Button>
                        <Button type="secondary" icon={<IconDelete />}
                                className="mr-2"
                                onClick={() =>handleDelete(record.section_id)}
                        ></Button>

                        <Button type="secondary" icon={ <IconSort />}
                                // onClick={() =>handleSort(record)}
                        ></Button>
                    </div>
                );
            },
        }
    ];
    function  updateSectionData(){
        getReq("video-sections").then((res)=>{
            console.log(res);
            if(res.status){
                setAllData(res.data);
            }
        });
    }

    useEffect(() => {
        updateSectionData();
        const subscription = PubSub.subscribe("showBillBoardVideoCover", (_, data) => {
            setCurrentVideoCoverURL(data.message);
            setVisible(true);
        });
        const subscription1 = PubSub.subscribe("updateSectionsData", () => {
            updateSectionData();
        });
        return ()=>{
            PubSub.unsubscribe(subscription);
            PubSub.unsubscribe(subscription1);
        };
    }, []);

    function  handleDelete(id:number){
        const deleteSec = ()=>{
            deleteReq(`video-sections?section_id=${id}`).then((res)=>{
                if(res.status){
                    Message.success("Delete successfully");
                    updateSectionData();
                }else {
                    Message.warning("Delete failed");
                }
            });
        };

        UI_ConfirmModal(
            "Delete",
            "Are you sure you want to delete this section?",
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
                        >Add Sections</Button>
                    </div>
                </div>
                <Table columns={columns}
                       data={allData}
                       expandedRowRender={
                           (record) => ExpandedRowRender(record.videos)
                       }
                />
                <AddSeriesModal visible={showModal} setVisible={setShowModal} type={"Sections"} />
            </div>
            <Image.Preview
                src={currentVideoCoverURL}
                visible={visible}
                onVisibleChange={setVisible}
            />
        </>
    );
}
