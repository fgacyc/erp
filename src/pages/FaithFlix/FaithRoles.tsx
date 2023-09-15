import {Button, Table, TableColumnProps} from "@arco-design/web-react";
import {useState} from "react";
import {IconDelete, IconEdit, IconPlus} from "@arco-design/web-react/icon";
import {AddNameAndDescModal} from "@/pages/FaithFlix/Modals/addNameAndDescModal.tsx";


export  default function FaithRoles() {
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
        },{
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

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            {/*<UIBreadcrumb items={breadcrumbItems} />*/}
            <div className="app-component full-screen-app-component p-5">
                <div className={"flex flex-row justify-between mb-3"}>
                    <Button type="secondary" icon={<IconPlus />}
                            onClick={() => setModalVisible(true)}
                            className={"mr-3"}
                    >Add Video roles</Button>
                </div>
                <Table columns={columns} data={data}
                       //loading={loadingVisible}
                />
            </div>
            <AddNameAndDescModal visible={modalVisible} setVisible={setModalVisible} modalTitle="Roles"  />
        </>
    );
}
