import React, {useEffect} from "react";
import {Button, Image, Table, TableColumnProps} from "@arco-design/web-react";
import {IconPlus} from "@arco-design/web-react/icon";
import {AddReviewsModalModal} from "@/components/UI_Modal/UI_Education/AddReviewsModal.tsx";
const ReviewsManagement = () => {

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

    const [showModal, setShowModal] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [currentVideoCoverURL, setCurrentVideoCoverURL] = React.useState("");

    useEffect(() => {
        const subscription = PubSub.subscribe("showBillBoardVideoCover", (_, data) => {
            setCurrentVideoCoverURL(data.message);
            setVisible(true);
        });
        return () => {
            PubSub.unsubscribe(subscription);
        };
    }, []);

    return (
        <>
            <div className="app-component full-screen-app-component p-5">
                <div className={"flex flex-row justify-between mb-3"}>
                    <div>
                        <Button type="secondary" icon={<IconPlus />}
                            onClick={() => setShowModal(true)}
                                className={"mr-3"}
                        >Add Reviews</Button>
                    </div>
                </div>
                <Table columns={columns} data={data}
                    //loading={loadingVisible}
                />
                <AddReviewsModalModal visible={showModal} setVisible={setShowModal} />
            </div>
            <Image.Preview
                src={currentVideoCoverURL}
                visible={visible}
                onVisibleChange={setVisible}
            />
        </>
    );
};

export default ReviewsManagement;
