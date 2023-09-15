//import UIBreadcrumb from "@/components/UIBreadcrumb";
import {Button, Message, Table, TableColumnProps} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";
import {IconDelete, IconEdit, IconPlus} from "@arco-design/web-react/icon";
import {AddCreditsModal} from "@/pages/FaithFlix/Modals/addCreditsModal.tsx";
import {deleteReq, getReq} from "@/tools/requests.ts";
import {creditDataToMap, type CreditData} from "@/pages/FaithFlix/data.ts";
import {useAddCreditsModalStore, type AddCreditsModalState} from "@/pages/FaithFlix/Modals/addCreditsModalStore.ts";


export default function FaithCredits() {
    const columns: TableColumnProps[] = [
        {
            title: "Name(ZH)",
            dataIndex: "name_zh",
        },
        {
            title: "Name(EN)",
            dataIndex: "name_en",
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
                            setCurrentCredit(record);
                            setAddVideoModalVisible(true);
                        }}
                    />}></Button>
                    <Button type="secondary" size="small" className="mr-2" icon={<IconDelete
                        onClick={() => {
                            deleteCredit(record.credit_id);
                        }}
                    />}></Button>
                </div>
            )
        },
    ];


    const [AddVideoModalVisible, setAddVideoModalVisible] = useState(false);
    //const [loadingVisible, setLoadingVisible] = useState(false);
    const [allData, setAllData] = useState<CreditData[]>([]);
    const setCurrentCredit = useAddCreditsModalStore((state: AddCreditsModalState) => state.setCreditsData);
    const [loadingVisible, setLoadingVisible] = useState(false);

    useEffect(() => {
        getLatestData();
        const subscription = PubSub.subscribe("updateCreditsData", () => {
            getLatestData();
        });
        return () => {
            PubSub.unsubscribe(subscription);
        };
    }, []);

    function getLatestData() {
        setLoadingVisible(true);
        getReq("credits").then((res) => {
            if (res.status) {
                console.log(res.data);
                const tableData = creditDataToMap(res.data);
                setAllData(tableData);
                setLoadingVisible(false);
            }
        });
    }

    function deleteCredit(id: number) {
        const deleteCredit = async () => {
            const res = await deleteReq("credits?credit_id=" + id);
            if (res.status) {
                Message.success("Delete credit successfully");
                getLatestData();
            }
        };

        UI_ConfirmModal(
            "Delete Credit",
            "Are you sure to delete this credit?",
            deleteCredit,
        );


    }

    return (
        <>
            {/*<UIBreadcrumb items={breadcrumbItems} />*/}
            <div className="app-component full-screen-app-component p-5">
                <div className={"flex flex-row justify-between mb-3"}>
                    <Button type="secondary" icon={<IconPlus/>}
                            onClick={() => setAddVideoModalVisible(true)}
                            className={"mr-3"}
                    >Add Credit</Button>
                </div>
                <Table
                    columns={columns}
                    data={allData}
                    loading={loadingVisible}
                />
            </div>
            <AddCreditsModal
                visible={AddVideoModalVisible}
                setVisible={setAddVideoModalVisible}
            />
        </>
    );
}
