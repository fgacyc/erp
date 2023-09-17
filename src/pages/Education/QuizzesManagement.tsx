import React from "react";
import { Table, TableColumnProps } from "@arco-design/web-react";
const QuizzesManagement = () => {

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


    return (
        <>
            <div className="app-component full-screen-app-component">
                <div
                    style={{
                        margin: "20px 20px 0 20px",
                        fontSize: 26,
                        fontWeight: "bold",
                    }}
                >
                    QuizzesManagement
                </div>
                <Table columns={columns} data={data} />
            </div>
        </>
    );
};
export default QuizzesManagement;
