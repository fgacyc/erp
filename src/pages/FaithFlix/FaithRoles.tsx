import UIBreadcrumb from "@/components/UIBreadcrumb";
import {Button, Table, TableColumnProps} from "@arco-design/web-react";
import {useState} from "react";
import { IconPlus} from "@arco-design/web-react/icon";
import AddVideoModal from "@/components/UI_Modal/UI_AddVideoModal/AddVideoModal.tsx";


export  default function FaithRoles() {
    const breadcrumbItems = [
        {
            name: "My Group",
            link: "/",
            clickable: false,
        },
        {
            name: "Pastoring",
            link: "/group/pastoring",
            clickable: true,
        },
    ];

    const columns: TableColumnProps[] = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Salary",
            dataIndex: "salary",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
    ];

    const data = [
        {
            key: "1",
            name: "Jane Doe",
            salary: 23000,
            address: "32 Park Road, London",
            email: "jane.doe@example.com",
        },
        {
            key: "2",
            name: "Alisa Ross",
            salary: 25000,
            address: "35 Park Road, London",
            email: "alisa.ross@example.com",
        },
        {
            key: "3",
            name: "Kevin Sandra",
            salary: 22000,
            address: "31 Park Road, London",
            email: "kevin.sandra@example.com",
        },
        {
            key: "4",
            name: "Ed Hellen",
            salary: 17000,
            address: "42 Park Road, London",
            email: "ed.hellen@example.com",
        },
        {
            key: "5",
            name: "William Smith",
            salary: 27000,
            address: "62 Park Road, London",
            email: "william.smith@example.com",
        },
    ];

    const [AddVideoModalVisible, setAddVideoModalVisible] = useState(false);
    //const [loadingVisible, setLoadingVisible] = useState(false);

    // function updateDBData() {
    //     const update = () => {
    //         setLoadingVisible(true);
    //
    //         setTimeout(() => {
    //             setLoadingVisible(false);
    //         }, 2000);
    //     };
    //
    //     UI_ConfirmModal(
    //         "Confirm",
    //         "Are you sure to update the new data from YouTube?",
    //         update,
    //     );
    // }

    return (
        <>
            <UIBreadcrumb items={breadcrumbItems} />
            <div className="app-component full-screen-app-component p-5">
                <div className={"flex flex-row justify-between mb-3"}>
                    <Button type="secondary" icon={<IconPlus />}
                            onClick={() => setAddVideoModalVisible(true)}
                            className={"mr-3"}
                    >Add Video</Button>
                </div>
                <Table columns={columns} data={data}
                       //loading={loadingVisible}
                />
            </div>
            <AddVideoModal visible={AddVideoModalVisible} setVisible={setAddVideoModalVisible} />
        </>
    );
}
