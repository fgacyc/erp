import {Form, FormInstance, Input, Modal} from "@arco-design/web-react";
const FormItem = Form.Item;
const TextArea = Input.TextArea;

import {FunctionComponent, useRef} from "react";

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
            </Form>
        </Modal>
    );
};
