import {getPaymentStatus} from "./data.ts";
import {Button, Space} from "@arco-design/web-react";
import {IconDelete} from "@arco-design/web-react/icon";

export const  columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'CYC ID',
        dataIndex: 'CYC_ID',
    },
    {
        title: 'Phone',
        dataIndex: 'phone_number',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: "Paid",
        dataIndex: "paid",
        render: (text, record) => (
            <div>
                {getPaymentStatus(record) === "pending" && <span>Not yet</span>}
                {getPaymentStatus(record) === "uploaded" && <span>Waiting Confirm</span>}
                {getPaymentStatus(record) === "confirmed "&& <span>Confirmed</span>}
            </div>
        )
    },
    {
        title:"Operation",
        render: (text, record) => (
            <Space>
                <Button type='secondary' icon={<IconDelete />}
                        onClick={() => deleteBtnHandler(record)}
                ></Button>
            </Space>
        )
    }
];
