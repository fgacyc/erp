import { Form, FormInstance, Input, Message, Modal, Select, Spin, Switch} from "@arco-design/web-react";
import React, {FunctionComponent, useEffect, useRef} from "react";
import {getReq, postReq} from "@/tools/requests.ts";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;


interface AddBillboardsModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

interface GenreTagSelectOption {
    label: string;
    value: number;
}

interface  VideoDataSelectOption {
    label: string;
    value: number;
}

interface SectionFormData  {
    genre_id: number;
    sync_mode: boolean;
    video_id: number;
    title: string;
    description: string;
    cover_url: string;
}

export const AddBillboardsModal: FunctionComponent<AddBillboardsModalProps> = ({visible, setVisible}) => {
    const formRef = useRef<FormInstance | null>(null);
    const [form] = Form.useForm();
    const [genres, setGenres] = React.useState<GenreTagSelectOption[]>([]);
    const [videos, setVideos] = React.useState<VideoDataSelectOption[]>([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        getReq("genre-tags-select").then((res) => {
            // console.log(res);
            if(res.status){
                setGenres(res.data.genres);
            }
        });
        // /video-data-select
        getReq("video-data-select").then((res) => {
            // console.log(res);
            if(res.status){
               setVideos(res.data);
            }
        });
    }, []);

    //useEffect(() => {
        // if (modalTitle === "Roles" && visible && isRoleUpdate ){
        //     formRef.current?.setFieldsValue({
        //         name: roleData?.role_name,
        //         description: roleData?.description
        //     });
        // }
        // else if((modalTitle === "Genres" || modalTitle === "Tags") && visible && isGenreTagUpdate){
        //     formRef.current?.setFieldsValue({
        //         name: genreTagData?.tag_name,
        //         description: genreTagData?.description
        //     });
        // }
        // else{
        //     resetRoleData();
        //     resetGenreTagData();
        //     formRef.current?.resetFields();
        // }

    //}, [visible]);


    function  getVideoDetails(){
        setLoading(true);
        const values:Partial<SectionFormData>| undefined =formRef.current?.getFieldsValue();
        if(!values) return;
        const video_id = values.video_id;
        getReq(`video-data?video_id=${video_id}`).then((res) => {
            // console.log(res);
            if(res.status){
                formRef.current?.setFieldsValue({
                    title: res.data.title,
                    description: res.data.description,
                    cover_url: res.data.cover_url
                });
            }
            setLoading(false);
        });
    }

    function handleOk() {
        form.validate().then((values) => {
            console.log(values);
            handleSubmit(values);
        }).catch((errorInfo) => {
            console.log(errorInfo);
            Message.warning("Please enter the required fields");
        });
    }

    function handleChange(value:Partial<FormData>) {
        const key = Object.keys(value)[0];
        if(key !== "video_id") return;
        getVideoDetails();
    }

    function handleSubmit(data:Partial<SectionFormData>) {
        postReq("billboards",data).then((res) => {
            if(res.status){
                setVisible(false);
                Message.success("Add billboard successfully");
                PubSub.publish("updateBillboardsData", { message: "" });
            }
        });
    }


    return (
        <Modal
            title={"Add Billboards"}
            visible={visible}
            onOk={handleOk}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            style={{width:600}}
        >
            <Spin loading={loading}>
                <Form autoComplete='off'
                      layout="horizontal"
                      ref={formRef}
                      form={form}
                      initialValues = {{
                            sync_mode: false
                      }}
                      onValuesChange={
                            (value) => handleChange(value)
                      }
                      className={"modal-form-style-fix"}>
                    <FormItem label={"Genre"} field="genre_id" className={"flex-nowrap"} rules={[{
                        required: true, message: "Please select genre"
                    }]}>
                        <Select
                            showSearch
                            allowClear
                            className={"w-[400px]"}
                            placeholder='Select Genres'
                            filterOption={(input, option) =>{
                                //console.log(option);
                                return option?.props.children.toLowerCase().includes(input.toLowerCase());
                            }}
                        >
                            {genres && genres.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label={"Sync Mode"} field="sync_mode" className={"flex-nowrap"}
                              tooltip={<div>Update synchronously after video update</div>}
                              rules={[{
                        required: true, message: "Please select sync mode"
                              }]}
                    >
                        <Switch checkedText='ON' uncheckedText='OFF' defaultChecked />
                    </FormItem>
                    <FormItem label={"Video"} field="video_id" className={"flex-nowrap"} rules={[{
                        required: true, message: "Please select video"
                    }]}>
                        <Select
                            showSearch
                            allowClear
                            className={"w-[400px]"}
                            placeholder='Select Genres'
                            filterOption={(input, option) =>{
                                return option?.props.children.toLowerCase().includes(input.toLowerCase());
                            }}
                        >
                            {videos && videos.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label={"Title"} field="title" className={"flex-nowrap"} rules={[{
                        required: true, message: "Please enter title"
                    }]}>
                        <Input placeholder="please enter billboard video tiltle..."
                               className={"w-[400px]"}
                               allowClear={true}/>
                    </FormItem>
                    <FormItem label='Description' field="description" className={"flex-nowrap"} rules={[{
                        required: true, message: "Please enter description"
                    }]}>
                        <TextArea placeholder="please enter billboard video's description..."
                                  allowClear
                                  className={"w-[400px] resize-none"}/>
                    </FormItem>
                    <FormItem label={"Cover URL"} field="cover_url" className={"flex-nowrap"} rules={[{
                        required: true, message:  "Please enter cover URL"
                    }]}>
                        <Input placeholder="please enter billboard cover URL..."
                               className={"w-[400px]"}
                               allowClear={true}/>
                    </FormItem>
                    <FormItem shouldUpdate>
                        {(value) => {
                            return <div
                                className={`w-full flex flex-row justify-end mb-4 ${value.cover_url ? "" : "hidden"}`}>
                                <div className={"w-[25%]"}></div>
                                <div className={"w-[65%]"}>
                                    <img className={"w-32 cursor-pointer"}
                                         src={value.cover_url} alt="cover"
                                         onClick={() => PubSub.publish("showBillBoardVideoCover", {message: value.cover_url})}
                                    />
                                </div>
                            </div>;
                        }}
                    </FormItem>
                </Form>
            </Spin>
        </Modal>
    );
};
