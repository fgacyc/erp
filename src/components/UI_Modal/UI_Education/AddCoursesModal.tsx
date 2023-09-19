import {Button, Form, FormInstance, Input, Modal, Space} from "@arco-design/web-react";
const FormItem = Form.Item;
const TextArea = Input.TextArea;
import "./style.css";

import {FunctionComponent, useRef} from "react";
import {IconDelete} from "@arco-design/web-react/icon";

interface AddCoursesModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}
export const AddCoursesModal: FunctionComponent<AddCoursesModalProps> = ({visible, setVisible}) => {
    const formRef = useRef<FormInstance | null>(null);
    const [form] = Form.useForm();

    return (
        <Modal
            title="Add Courses"
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
        >
            <Form autoComplete='off'
                  layout="horizontal"
                  ref={formRef}
                  form={form}
                  className={"modal-form-style-fix"}>
                <FormItem label={"Name"} field="name" className={"flex-nowrap"} rules={[{
                    required: true, message: "Please select genre"
                }]}>
                    <Input placeholder="please enter Credit's Chinese name..." className={"w-[300px]"}/>
                </FormItem>
                <FormItem label='Description' field="description" className={"flex-nowrap"} rules={[{
                    required: true, message: "Please select genre"
                }]}>
                    <TextArea placeholder="please enter Credit's description..."
                              className={"w-[300px] resize-none"}/>
                </FormItem>
                <Form.List field='users'>
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((item, index) => {
                                    return (
                                        <div key={item.key}>
                                            <Form.Item label={"User " + index}>
                                                <Space>
                                                    <Form.Item
                                                        field={item.field + ".username"}
                                                        rules={[{ required: true }]}
                                                        noStyle
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        field={item.field + ".address"}
                                                        rules={[{ required: true }]}
                                                        noStyle
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Button
                                                        icon={<IconDelete />}
                                                        shape='circle'
                                                        status='danger'
                                                        onClick={() => remove(index)}
                                                    ></Button>
                                                </Space>
                                            </Form.Item>
                                        </div>
                                    );
                                })}
                                <Form.Item wrapperCol={{ offset: 5 }}>
                                    <Button
                                        onClick={() => {
                                            add();
                                        }}
                                    >
                                        Add User
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
