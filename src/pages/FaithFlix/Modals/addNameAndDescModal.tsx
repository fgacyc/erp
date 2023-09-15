import {Form, FormInstance, Input, Modal} from "@arco-design/web-react";
import {FunctionComponent, useRef} from "react";
import {addRoleGenreTag, GenreTag, VideoRole} from "@/pages/FaithFlix/data.ts";

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
        if (modalTitle === "Roles") {
            const newRoles: VideoRole = {
                role_name: formRef.current?.getFieldValue("name"),
                description: formRef.current?.getFieldValue("description"),
                role_id: 0,
                created_at: "",
                updated_at: "",
            };
            addRoleGenreTag("Roles",newRoles).then((res) => {
                console.log(res);
                if(res.status) PubSub.publish("updateRoles");
            });
        }
        else if (modalTitle === "Genres") {
            const newRoles: GenreTag = {
                tag_name: formRef.current?.getFieldValue("name"),
                description: formRef.current?.getFieldValue("description"),
                type: "genre",
                tag_id: 0,
                created_at: "",
                updated_at: "",
            };
            addRoleGenreTag("Genres",newRoles).then((res) => {
                console.log(res);
                if(res.status) PubSub.publish("updateGenres");
            });
        } else if (modalTitle === "Tags") {
            const newRoles: GenreTag = {
                tag_name: formRef.current?.getFieldValue("name"),
                description: formRef.current?.getFieldValue("description"),
                type: "tag",
                tag_id: 0,
                created_at: "",
                updated_at: "",
            };
            addRoleGenreTag("Tags",newRoles).then((res) => {
                console.log(res);
                if(res.status) PubSub.publish("updateTags");
            });
        }
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
