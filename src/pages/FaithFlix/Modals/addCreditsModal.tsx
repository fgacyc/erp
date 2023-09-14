import {FormInstance, Modal} from "@arco-design/web-react";
import { Form, Input} from "@arco-design/web-react";
import {FunctionComponent, useEffect, useRef} from "react";
// import { postReq, putReq} from "@/tools/requests.ts";
import {useAddCreditsModalStore} from "@/pages/FaithFlix/Modals/addCreditsModalStore.ts";
const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface AddCreditsModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

// interface CreditFormData extends FormData {
//     name_zh: string;
//     name_en: string;
//     oauth2_id: string;
//     description: string;
// }

export  const  AddCreditsModal:FunctionComponent<AddCreditsModalProps> = ({ visible, setVisible}) => {
    const formRef = useRef<FormInstance | null>(null);
    const [form] = Form.useForm();
    const [creditsData, isUpdate] = useAddCreditsModalStore((state) => [state.creditsData, state.isUpdate]);
    const reset = useAddCreditsModalStore((state) => state.resetCreditsData);

    useEffect(() => {
        if (visible && isUpdate) {
            formRef.current?.setFieldsValue(creditsData);
        }else{
            reset();
            formRef.current?.resetFields();
        }

    }, [creditsData, isUpdate, reset, visible]);

    async  function handleOk() {
        // // console.log(formRef.current?.());
        // const values:CreditFormData = formRef.current?.getFieldsValue();
        // //console.log(values);
        // if(values?.name_en ==="") {
        //     Message.warning("Please enter the English name of the credit");
        //     return;
        // }
        // if(values?.name_zh ===""){
        //     Message.warning("Please enter the Chinese name of the credit");
        //     return;
        // }
        // if(!isUpdate){ // create
        //     postReq("credits",values).then((res)=>{
        //         //console.log(res);
        //         if(res.status){
        //             setVisible(false);
        //             Message.success("Add credit successfully");
        //             PubSub.publish("updateCreditsData", { message: "" });
        //         }
        //     });
        // }else{
        //     values.credit_id = creditsData!.credit_id;
        //     console.log(values);
        //     putReq("credits",values).then((res)=>{
        //         //console.log(res);
        //         if(res.status){
        //             setVisible(false);
        //             Message.success("Add credit successfully");
        //             PubSub.publish("updateCreditsData", { message: "" });
        //         }
        //     });
        // }


    }


    return (
        <Modal
            title="Add Credit"
            visible={visible}
            onOk={handleOk}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
        >
            <div>
                <Form  autoComplete='off'
                       layout="horizontal"
                       ref={formRef}
                       form={form}
                       className={"modal-form-style-fix"}>
                    <FormItem label='Name(CN)' field="name_zh" className={"flex-nowrap"} required>
                        <Input placeholder="please enter Credit's Chinese name..."  className={"w-[300px]"}  />
                    </FormItem>
                    <FormItem label='Name(EN)' field="name_en" className={"flex-nowrap"} required>
                        <Input placeholder="please enter Credit's English name..." className={"w-[300px]"}  />
                    </FormItem>
                    <FormItem label='Oauth2 ID' field="oauth2_id" className={"flex-nowrap"} >
                        <Input placeholder="please enter Credit's Oauth2 ID..." className={"w-[300px]"}  />
                    </FormItem>
                    <FormItem label='Description' field="description" className={"flex-nowrap"} >
                        <TextArea placeholder="please enter Credit's description..." className={"w-[300px] resize-none"}  />
                    </FormItem>
                </Form>
            </div>
        </Modal>
    );
};
