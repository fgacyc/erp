import {Button, Divider, Form, FormInstance, Input, Modal, Space} from "@arco-design/web-react";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
import "./style.css";


import {FunctionComponent, useEffect, useRef} from "react";
import {IconDelete} from "@arco-design/web-react/icon";
import {postReq, putReq} from "@/tools/requests.ts";
import {useAddCoursesStore} from "@/components/UI_Modal/UI_Education/store/AddCoursesStore.ts";

interface AddCoursesModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    updateCoursesData?: () => void;
}
export const AddCoursesModal: FunctionComponent<AddCoursesModalProps> = ({visible, setVisible,updateCoursesData}) => {
    const formRef = useRef<FormInstance | null>(null);
    const [form] = Form.useForm();
    const [courseData, isUpdate] = useAddCoursesStore((state) => [state.courseData, state.isUpdate]);
    const reset =   useAddCoursesStore((state) => state.resetCourseData);

    useEffect(() => {
        if (visible && isUpdate) {
            formRef.current?.setFieldsValue(courseData);
        }else{
            reset();
            formRef.current?.resetFields();
        }
    //     eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);



    async  function handleSubmit(){
        // setIsHandling(true);
        if(isUpdate){
            await updateCourseData();
        }else{
            await  createCourseData();
        }
    }

    async function createCourseData(){
        try {
            const values = await form.validate();
            // console.log("create",values);
            // return;
            postReq("classes-courses",values).then((res)=>{
                console.log(res);
                if(res.status){
                    updateCoursesData?.();
                    reset();
                    setVisible(false);
                }
                return;
            });
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
            return;
        }
    }

    async function updateCourseData(){
        try {
            const values = await form.validate();
            // console.log("update",values);
            // return;
            const course_id = courseData?.course_id;
            putReq(`classes-courses?course_id=${course_id}`,values).then((res)=>{
                console.log(res);
                if(res.status){
                    updateCoursesData?.();
                    reset();
                    setVisible(false);

                }
                return;
            });
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
            return;
        }
    }

    return (
        <Modal
            title="Add Courses"
            visible={visible}
            onOk={() => {
                handleSubmit();
            }}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            style={{width: 800, height: 600}}
        >
            <Form autoComplete='off'
                  layout="horizontal"
                  ref={formRef}
                  form={form}
                  className={"modal-form-style-fix h-[430px] overflow-y-auto overflow-x-hidden"}
                  initialValues={{
                      classes: [
                          {
                              class_name: "",
                              class_url: "",
                              cover_url: "",
                              class_description: "",
                          },
                      ],
                  }}

            >
                <FormItem label={"Name"} field="course_name" className={"flex-nowrap"} rules={[{
                    required: true, message: "Please enter class name"
                }]}>
                    <Input placeholder="please enter Credit's Chinese name..." className={"w-[510px]"}/>
                </FormItem>
                <Form.Item
                    label={"Cover URL"}
                    field={"cover_url"}
                    rules={[{required: true,
                        message: "Please enter course cover url"
                    }]}
                >
                    <Input placeholder={"Class Cover URL..."}
                           className={"w-[510px]"}/>
                </Form.Item>
                <FormItem label='Description' field="course_description" className={"flex-nowrap"} rules={[{
                    required: true, message: "Please enter class description"
                }]}>
                    <TextArea placeholder="please enter Credit's description..."
                              className={"w-[510px] resize-none"}/>
                </FormItem>

                <Divider/>

                <Form.List field='classes'>
                    {(fields, {add, remove}) => {
                        return (
                            <div>
                                {fields.map((item, index) => {
                                    return (
                                        <div key={item.key}>
                                            <Form.Item label={"Class " + `${index + 1}`}>
                                                <Space className={"flex flex-row items-start"}>
                                                    <Space className={"flex flex-col items-start justify-start"}>
                                                        <Form.Item
                                                            field={item.field + ".class_name"}
                                                            rules={[{required: true
                                                                , message: "Please enter class title"
                                                            }]}
                                                            noStyle

                                                        >
                                                            <Input placeholder={"Class Title..."}
                                                                   className={"my-2 w-[510px]"}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            field={item.field + ".class_url"}
                                                            rules={[{required: true,
                                                                message: "Please enter class video url"
                                                            }]}
                                                            noStyle
                                                        >
                                                            <Input placeholder={"Class Video URL..."}
                                                                   className={"my-2 w-[510px]"}/>
                                                        </Form.Item>
                                                        <Form.Item
                                                            field={item.field + ".cover_url"}
                                                            rules={[{required: true,
                                                                message: "Please enter class cover url"
                                                            }]}
                                                            noStyle
                                                        >
                                                            <Input placeholder={"Class Cover URL..."}
                                                                   className={"my-2 w-[510px]"}/>
                                                        </Form.Item>
                                                        <Form.Item
                                                            field={item.field + ".class_description"}
                                                            rules={[{required: true,
                                                                message: "Please enter class description"
                                                            }]}
                                                            noStyle
                                                        >
                                                            <TextArea placeholder={"Class Description..."}
                                                                      className={"my-2 w-[510px]"}/>
                                                        </Form.Item>

                                                    </Space>
                                                    <Button
                                                        icon={<IconDelete/>}
                                                        shape='circle'
                                                        status='danger'
                                                        className={"relative top-2"}
                                                        onClick={() => remove(index)}
                                                    ></Button>
                                                </Space>
                                            </Form.Item>
                                        </div>
                                    );
                                })}
                                <Form.Item wrapperCol={{offset: 5}}>
                                    <Button
                                        onClick={() => {
                                            add();
                                        }}
                                    >
                                        Add Class
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
            </Form>
        </Modal>
    );
};
