import {Form, FormInstance, Input, Modal} from "@arco-design/web-react";
import {FunctionComponent, useEffect, useRef} from "react";
import {addRoleGenreTag, GenreTag, updateRoleGenreTag, VideoRole} from "@/pages/FaithFlix/data.ts";
import {useAddGenreTagModalStore, useAddRoleModalStore} from "@/pages/FaithFlix/Modals/addNameAndDescStore.ts";

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
    const [roleData,isRoleUpdate,resetRoleData] = useAddRoleModalStore((state) => [state.roleData,state.isUpdate,state.resetRoleData]);
    const [genreTagData,isGenreTagUpdate,resetGenreTagData] = useAddGenreTagModalStore((state) => [state.genreTagData,state.isUpdate,state.resetGenreTagData]);

    useEffect(() => {
        if (modalTitle === "Roles" && visible && isRoleUpdate ){
            formRef.current?.setFieldsValue({
                    name: roleData?.role_name,
                    description: roleData?.description
            });
        }
        else if((modalTitle === "Genres" || modalTitle === "Tags") && visible && isGenreTagUpdate){
            formRef.current?.setFieldsValue({
                name: genreTagData?.tag_name,
                description: genreTagData?.description
            });
        }
        else{
            resetRoleData();
            resetGenreTagData();
            formRef.current?.resetFields();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    function addRoles(type:string){
        const newRoles: VideoRole = {
            role_name: formRef.current?.getFieldValue("name"),
            description: formRef.current?.getFieldValue("description"),
            role_id: 0,
            created_at: "",
            updated_at: "",
        };
        if(type === "update"){
            if(!roleData) return;
            updateRoleGenreTag("Roles",roleData.role_id,newRoles).then((res) => {
                console.log(res);
                if(res.status) PubSub.publish("updateRoles");
            });
        }
        else if(type === "add"){
            addRoleGenreTag("Roles",newRoles).then((res) => {
                console.log(res);
                if(res.status) PubSub.publish("updateRoles");
            });
        }
    }

    function addGenreOrTag(type:string){
        const newGenreTag: GenreTag = {
            tag_name: formRef.current?.getFieldValue("name"),
            description: formRef.current?.getFieldValue("description"),
            type: modalTitle === "Genres" ? "genre" : "tag",
            tag_id: 0,
            created_at: "",
            updated_at: "",
        };
        if(type === "update"){
            if(!genreTagData) return;
            updateRoleGenreTag(modalTitle,genreTagData.tag_id,newGenreTag).then((res) => {
                console.log(res);
                if(res.status) PubSub.publish(`update${modalTitle}`);
            });
        }
        else if(type === "add"){
            addRoleGenreTag(modalTitle,newGenreTag).then((res) => {
                console.log(res);
                if(res.status) PubSub.publish(`update${modalTitle}`);
            });
        }
    }

    function handleOk() {
        if (modalTitle === "Roles") {
            if(isRoleUpdate){
                addRoles("update");
            }else{
                console.log("add11");
                addRoles("add");
            }
        }
        else if (modalTitle === "Genres") {
            if(isGenreTagUpdate){
                addGenreOrTag("update");
            }else{
                addGenreOrTag("add");
            }
        } else if (modalTitle === "Tags") {
            if(isGenreTagUpdate){
                addGenreOrTag("update");
            }else{
                addGenreOrTag("add");
            }
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
