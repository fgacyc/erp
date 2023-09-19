import React, {useEffect, useState} from "react";
import {Button, Table,Image, TableColumnProps} from "@arco-design/web-react";
import {IconDelete, IconEdit, IconPlus, IconSort} from "@arco-design/web-react/icon";
import {AddCoursesModal} from "@/components/UI_Modal/UI_Education/AddCoursesModal.tsx";
import {deleteReq, getReq} from "@/tools/requests.ts";
import {useAddCoursesStore} from "@/components/UI_Modal/UI_Education/store/AddCoursesStore.ts";
import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";

interface ClassDB{
    key: number;
    class_id: number;
    class_name: string;
    class_url: string;
    class_description: string;
    cover_url: string;
}


export interface CourseDB{
    key: number;
    course_id: number;
    course_name: string;
    course_description: string;
    cover_url: string;
    classes: ClassDB[];
}
function courseExpandedRowRender(data:ClassDB[]) {
    const columns: TableColumnProps[] = [
        {
            title: "Class Name",
            dataIndex: "class_name",
        },
        {
            title: "Cover",
            render: (_, record) => {
                return (
                    <img src={record.cover_url} alt={record.title} className={"w-20 h-12 object-cover cursor-pointer"}
                         onClick={() => {
                             PubSub.publish("showCourseCover", {message: record.cover_url});
                         }}
                    />
                );
            }
        },
        {
            title: "Description",
            dataIndex: "description",
        }];

    return <Table columns={columns} data={data} pagination={false} />;
}


const CoursesManagement = () => {

    const columns: TableColumnProps[] = [
        {
            title: "Course Name",
            dataIndex: "course_name",
        },{
            title: "Cover",
            render: (_, record) => {
                return (
                    <img src={record.cover_url} alt={record.title} className={"w-20 h-12 object-cover cursor-pointer"}
                         onClick={() => {
                             PubSub.publish("showCourseCover", {message: record.cover_url});
                         }}
                    />
                );
            }
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Operation",
            render: (_, record) => {
                return (
                    <div className={"flex flex-row justify-start "}>
                        <Button type="secondary" className="mr-2"
                                icon={<IconEdit
                                    onClick={() => {
                                        handleEdit(record);
                                    }}
                                />}></Button>
                        <Button type="secondary" icon={<IconDelete />}
                                className="mr-2"
                                onClick={() =>handleDelete(record.course_id)}
                        ></Button>
                        <Button type="secondary" icon={ <IconSort />}
                                //onClick={() =>handleSort(record)}
                        ></Button>
                    </div>
                );
            },
        }
    ];


    const [showModal, setShowModal] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [currentVideoCoverURL, setCurrentVideoCoverURL] = React.useState("");
    const [allCourses, setAllCourses] = useState<CourseDB[]>([]);
    const setCourseData =   useAddCoursesStore((state) => state.setCourseData);

    useEffect(() => {
        updateCoursesData();
        const subscription = PubSub.subscribe("showCourseCover", (_, data) => {
            setCurrentVideoCoverURL(data.message);
            setVisible(true);
        });
        return () => {
            PubSub.unsubscribe(subscription);
        };
    }, []);


    function  updateCoursesData(){
        console.log("updateCoursesData");
        getReq("classes-courses").then((res)=>{
            console.log(res);
            if (res.status){
                setAllCourses(res.data);
            }
        });
    }


    function handleDelete(course_id: number){
        function deleteCourse(){
            deleteReq(`classes-courses?course_id=${course_id}`).then((res)=>{
                if(res.status){
                    updateCoursesData();
                }
            });
        }

        UI_ConfirmModal(
            "Delete Course",
            "Are you sure to delete this course?",
            deleteCourse
        );
    }

    function  handleEdit(record: CourseDB){
        setCourseData(record);
        setShowModal(true);
    }

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
                       expandedRowRender={
                           (record)=>courseExpandedRowRender(record.classes)
                       }
                    //loading={loadingVisible}
                />
                <AddCoursesModal visible={showModal}
                                 setVisible={setShowModal}
                                    updateCoursesData={updateCoursesData}
                />
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
