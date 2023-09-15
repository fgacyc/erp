import {Form, FormInstance, Input, Modal} from "@arco-design/web-react";
import {FunctionComponent, useRef} from "react";

const FormItem = Form.Item;
const TextArea = Input.TextArea;


interface AddNameAndDescModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    modalTitle: string;
}

export const AddNameAndDescModal: FunctionComponent<AddNameAndDescModalProps> = ({visible, setVisible, modalTitle}) => {
    const formRef = useRef<FormInstance | null>(null);
    const [form] = Form.useForm();

    function handleOk() {
        console.log(formRef.current?.getFieldsValue());
        // if (modalTitle === "Roles") {
        //     upsertRole();
        // } else if (modalTitle === "Genres") {
        //     upsertGenreTags("Genres");
        // } else if (modalTitle === "Tags") {
        //     upsertGenreTags("Tags");
        // }
        setVisible(false);
    }


    return (
        <Modal
            title={`Add ${modalTitle}`}
            visible={visible}
            onOk={handleOk}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
        >
            <div>
                <Form autoComplete='off'
                      layout="horizontal"
                      ref={formRef}
                      form={form}
                      className={"modal-form-style-fix"}>
                    <FormItem label={`${modalTitle} Name`} field="name" className={"flex-nowrap"} required>
                        <Input placeholder="please enter Credit's Chinese name..." className={"w-[300px]"}/>
                    </FormItem>
                    <FormItem label='Description' field="description" className={"flex-nowrap"}>
                        <TextArea placeholder="please enter Credit's description..."
                                  className={"w-[300px] resize-none"}/>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    );
};
