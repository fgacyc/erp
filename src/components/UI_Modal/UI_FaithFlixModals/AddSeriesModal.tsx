import {Input, Message, Modal, Spin, Form, FormInstance} from "@arco-design/web-react";
import React, {useEffect, useRef} from "react";
import "./style.css";
import {Transfer} from "@arco-design/web-react";
import {getReq, postReq} from "@/tools/requests.ts";
import {TransferItem} from "@arco-design/web-react/es/Transfer/interface";
import PubSub from "pubsub-js";
import {useAddSeriesModalStore} from "@/components/UI_Modal/UI_FaithFlixModals/stores/addSeriesModalStore.ts";
const FormItem = Form.Item;

const TextArea = Input.TextArea;


interface AddVideoModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    type: "Series" | "Sections"
}


export default function AddSeriesModal(props: AddVideoModalProps) {
    const {visible, setVisible,type} = props;
    const [transferData, setTransferData] = React.useState<TransferItem[]>([]);
    const [episodeData, setEpisodeData] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(false);
    const formRef = useRef<FormInstance | null>(null);
    const [form] = Form.useForm();
    const [currentEpisodeData, isUpdate,resetEpisodeData] = useAddSeriesModalStore((state) => [state.episodeData, state.isUpdate,state.resetEpisodeData]);



    useEffect(() => {
        setLoading(true);
        getReq("video-data/transfer").then((res) => {
            // console.log(res);
            if (res.status) {
                setTransferData(res.data);
            }
            setLoading(false);
        });
    }, []);



    useEffect(() => {
        if(!visible){
            setEpisodeData([]);
            formRef.current?.resetFields();
        }
        else if(visible && isUpdate){
            if(!currentEpisodeData) return;
            // console.log(currentEpisodeData);
            formRef.current?.setFieldsValue(currentEpisodeData);
            setEpisodeData(currentEpisodeData.videos.map((item)=>item.video_id.toString()));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    function handlerChange(_targetKeys: string[], direction: string, moveKeys: string[]) {
        // console.log(direction, moveKeys);
        if (direction === "target") {
            setEpisodeData([...episodeData, ...moveKeys]);
        } else if (direction === "source") {
            setEpisodeData(episodeData.filter((item) => !moveKeys.includes(item)));
        }
        //console.log(episodeData);
    }

    async function  handleSubmit() {
        try {
            await form.validate();
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
            return;
        }

        if (episodeData.length <= 1) {
            Message.warning("Please select at least two video");
            return;
        }
        let data = {};
        let router = "";

        if (type === "Series") {
            data = {
                series_name: formRef.current?.getFieldValue("series_name"),
                series_description: formRef.current?.getFieldValue("series_description"),
                episodes: episodeData
            };
            router = "video-series";
        }
        else if (type === "Sections") {
            data = {
                section_name: formRef.current?.getFieldValue("section_name"),
                section_description: formRef.current?.getFieldValue("section_description"),
                videos: episodeData
            };
            router = "video-sections";
        }

        setLoading(true);
        postReq(router, data).then((res) => {
            console.log(res);
            if (res.status) {
                Message.success(`Add ${type} successfully`);
                setVisible(false);
                PubSub.publish(`update${type}Data`);
                resetEpisodeData();
            }
            setLoading(false);
        });
    }

    return (
        <Modal
            title={`Add ${type}`}
            visible={visible}
            onOk={handleSubmit}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            style={{width: 840, height: 700, borderRadius: 5}}
        >
            <div className={"modal-form-style-fix"} >
                <Form  autoComplete='off' layout="horizontal"
                       ref={formRef}
                       form={form}
                >
                    <FormItem label={`${type} Name`} field="series_name"
                        rules={[{
                            required: true,
                            message: "Please enter series name"
                        }]}
                    >
                        <Input
                            allowClear placeholder='Please Enter something'
                        />
                    </FormItem>
                    <FormItem label='Description' field="series_description" rules={[{
                        required: true,
                        message: "Please enter series description"
                    }]}>
                        <TextArea
                            placeholder='Please enter series description'
                            className={"resize-none mb-2"}
                            autoSize={{minRows: 2, maxRows: 5}}
                            allowClear
                        />
                    </FormItem>

                </Form>
            </div>

            <Spin className={"w-full h-full"} loading={loading}>
                <Transfer
                    pagination
                    showSearch
                    oneWay
                    dataSource={transferData}
                    searchPlaceholder='Please select'
                    targetKeys={episodeData}
                    titleTexts={["Available Videos", "Selected Videos"]}
                    onResetData={() => setEpisodeData([])}
                    simple={true}
                    onChange={
                        (targetKeys, direction, moveKeys) => handlerChange(targetKeys, direction, moveKeys)
                    }
                    listStyle={[
                        {
                            width: 400,
                            height: 400,
                        },
                        {
                            width: 400,
                            height: 400,
                        }
                    ]}
                />
            </Spin>
        </Modal>
    );
}
