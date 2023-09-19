import React, {useEffect, useState} from "react";
import {Button, Table,Image, TableColumnProps} from "@arco-design/web-react";
import {IconPlus} from "@arco-design/web-react/icon";
import {AddCoursesModal} from "@/components/UI_Modal/UI_Education/AddCoursesModal.tsx";
import {getReq} from "@/tools/requests.ts";

interface ClassDB{
    key: number;
    class_id: number;
    class_name: string;
    class_url: string;
    class_description: string;
}


interface CourseDB{
    key: number;
    course_id: number;
    course_name: string;
    course_description: string;
    classes: ClassDB[];
}
const CoursesManagement = () => {

    const columns: TableColumnProps[] = [
        {
            title: "Course Name",
            dataIndex: "course_name",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Operation",
            dataIndex: "operation",
        }
    ];

    const [showModal, setShowModal] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [currentVideoCoverURL, setCurrentVideoCoverURL] = React.useState("");
    const [allCourses, setAllCourses] = useState<CourseDB[]>([]);

    useEffect(() => {
        const subscription = PubSub.subscribe("showBillBoardVideoCover", (_, data) => {
            setCurrentVideoCoverURL(data.message);
            setVisible(true);
        });
        return () => {
            PubSub.unsubscribe(subscription);
        };
    }, []);

    useEffect(() => {
        getReq("classes-courses").then((res)=>{
            //console.log(res);
            if (res.status){
                setAllCourses(res.data);
            }
        });
    }, []);


    return (
        <>
            <div className="app-component full-screen-app-component p-5">
                <div className={"flex flex-row justify-between mb-3"}>
                    <div>
                        <Button type="secondary" icon={<IconPlus />}
                                onClick={() => setShowModal(true)}
                                className={"mr-3"}
                        >Add Courses</Button>
                    </div>
                </div>
                <Table columns={columns} data={allCourses}
                    //loading={loadingVisible}
                />
                <AddCoursesModal visible={showModal} setVisible={setShowModal} />
            </div>
            <Image.Preview
                src={currentVideoCoverURL}
                visible={visible}
                onVisibleChange={setVisible}
            />
        </>
    );
};

export default CoursesManagement;
