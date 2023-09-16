import {Input, Message, Modal, Spin, Form, FormInstance} from "@arco-design/web-react";
import React, {useEffect, useRef} from "react";
import "./style.css";
import {Transfer} from "@arco-design/web-react";
import {getReq, postReq} from "@/tools/requests.ts";
import {TransferItem} from "@arco-design/web-react/es/Transfer/interface";
import PubSub from "pubsub-js";
const FormItem = Form.Item;

const TextArea = Input.TextArea;


interface AddVideoModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}


export default function AddSeriesModal(props: AddVideoModalProps) {
    const {visible, setVisible} = props;
    const [transferData, setTransferData] = React.useState<TransferItem[]>([]);
    const [episodeData, setEpisodeData] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(false);
    const formRef = useRef<FormInstance | null>(null);
    const [form] = Form.useForm();



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
        }else{
            console.log(episodeData);
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

        const data = {
            series_name: formRef.current?.getFieldValue("series_name"),
            series_description: formRef.current?.getFieldValue("series_description"),
            episodes: episodeData
        };
        console.log(data);

        setLoading(true);
        postReq("video-series", data).then((res) => {
            console.log(res);
            if (res.status) {
                Message.success("Add series successfully");
                setVisible(false);
                PubSub.publish("updateSeriesData");
            }
            setLoading(false);
        });
    }

    return (
        <Modal
            title="Add Series"
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
                    <FormItem label='Series Name' field="series_name"
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
