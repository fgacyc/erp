import {Button, Table, TableColumnProps} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {IconDelete, IconEdit, IconPlus} from "@arco-design/web-react/icon";
import {AddNameAndDescModal} from "@/pages/FaithFlix/Modals/addNameAndDescModal.tsx";
import {GenreTag, getRoleGenreTag} from "@/pages/FaithFlix/data.ts";
import PubSub from "pubsub-js";


export  default function FaithGenres() {
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
                            console.log(record.credit_id);
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
                const genresData = res.data.filter((item:GenreTag) => item.type === "genre");
                setAllData(genresData);
            }
        });
    }

    useEffect(() => {
        updateData();
        const subscription = PubSub.subscribe("updateGenres", () => {
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
                    >Add Video Genres</Button>
                </div>
                <Table columns={columns} data={allData}
                    //loading={loadingVisible}
                />
            </div>
            <AddNameAndDescModal visible={modalVisible} setVisible={setModalVisible} modalTitle="Genres"  />
        </>
    );
}
