import {Button, Message, Table, TableColumnProps} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {IconDelete, IconEdit, IconPlus} from "@arco-design/web-react/icon";
import {AddNameAndDescModal} from "@/components/UI_Modal/UI_FaithFlixModals/addNameAndDescModal.tsx";
import {deleteRoleGenreTag, GenreTag, getRoleGenreTag} from "@/pages/FaithFlix/data.ts";
import PubSub from "pubsub-js";
import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";
import {useAddGenreTagModalStore} from "@/components/UI_Modal/UI_FaithFlixModals/stores/addNameAndDescStore.ts";


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
                        onClick={() => {
                            setModalVisible(true);
                            setGenreTagData(record);
                        }}
                    />}></Button>
                    <Button type="secondary" size="small" className="mr-2" icon={<IconDelete
                        onClick={() => {
                            deleteData(record);
                        }}
                    />}></Button>
                </div>
            )
        }
    ];
    const [modalVisible, setModalVisible] = useState(false);
    const [allData, setAllData] = useState<GenreTag[]>([]);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const setGenreTagData = useAddGenreTagModalStore((state) => state.setGenreTagData);

    function updateData(){
        setLoadingVisible(true);
        getRoleGenreTag("genres").then((res) => {
            if(res.status){
                const genresData = res.data.filter((item:GenreTag) => item.type === "genre");
                setAllData(genresData);
                setLoadingVisible(false);
            }
        });
    }

    function deleteData(genreTag:GenreTag){
        console.log(genreTag);
        if(genreTag.tag_name === "Worship"|| genreTag.tag_name === "Sermon"){
            Message.warning("Cannot delete Music or Sermon");
            return;
        }

        const id = genreTag?.tag_id;
        const name = genreTag?.tag_name;
        const deleteGenre = async () => {
            const res = await  deleteRoleGenreTag("genres",id);
            console.log(res);
            if(res.status) {
                updateData();
                Message.success(`Delete Genre: ${name} Success`);
            }
        };

        UI_ConfirmModal(
            "Delete Genre",
            "Are you sure you want to delete this genre?",
            deleteGenre
        );
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
                    loading={loadingVisible}
                />
            </div>
            <AddNameAndDescModal visible={modalVisible} setVisible={setModalVisible} modalTitle="Genres"  />
        </>
    );
}
