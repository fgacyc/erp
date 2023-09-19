import {Button, Divider, Form, FormInstance, Input, Modal, Space} from "@arco-design/web-react";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
import "./style.css";


import {FunctionComponent, useRef} from "react";
import {IconDelete} from "@arco-design/web-react/icon";
import { postReq} from "@/tools/requests.ts";

interface AddCoursesModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

// interface Class{
//     class_name: string;
//     class_url: string;
//     class_description: string;
// }
//
// interface ClassDB{
//     key: number;
//     class_id: number;
//     class_name: string;
//     class_url: string;
//     class_description: string;
// }
//
// interface Course{
//     course_name: string;
//     course_description: string;
//     classes: Class[];
// }
//
// interface CourseDB{
//     key: number;
//     course_id: number;
//     course_name: string;
//     course_description: string;
//     classes: Class[];
// }

export const AddCoursesModal: FunctionComponent<AddCoursesModalProps> = ({visible, setVisible}) => {
    const formRef = useRef<FormInstance | null>(null);
    const [form] = Form.useForm();




    async  function handleSubmit(){
        try {
            const values = await form.validate();
            postReq("classes-courses",values).then((res)=>{
                console.log(res);
                if(res.status){
                    setVisible(false);
                }
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
