// import "./Members.css";
import {Button, Table} from '@arco-design/web-react';
import AddMembersModal from "./AddMembersModal.jsx";
import {useState} from "react";


export  default  function Members() {
    const  [visible, setVisible] = useState(false)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'Jane Doe',
            address: '32 Park Road, London',
            email: 'jane.doe@example.com',
        },
        {
            key: '2',
            name: 'Alisa Ross',
            address: '35 Park Road, London',
            email: 'alisa.ross@example.com',
        },
        {
            key: '3',
            name: 'Kevin Sandra',
            address: '31 Park Road, London',
            email: 'kevin.sandra@example.com',
        },
        {
            key: '4',
            name: 'Ed Hellen',
            address: '42 Park Road, London',
            email: 'ed.hellen@example.com',
        },
        {
            key: '5',
            name: 'William Smith',
            address: '62 Park Road, London',
            email: 'william.smith@example.com',
        },
    ];


    return  (
        <div>
            <Button type='primary' style={{margin: '10px 0  '}}
                    onClick={() => setVisible(true)}
            >Add new member</Button>
            <Table columns={columns} data={data} />
            <AddMembersModal
                visible={visible}
                setVisible={setVisible}
            />
        </div>

    )
}