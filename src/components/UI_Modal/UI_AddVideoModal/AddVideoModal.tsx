import {Button, DatePicker, Divider, FormInstance, Input, Message, Modal, Select, Space} from "@arco-design/web-react";
import {Form, TimePicker, Radio, InputTag} from "@arco-design/web-react";
import React, {useRef} from "react";
import {IconDelete, IconPlus, IconSearch} from "@arco-design/web-react/icon";
import {FieldError} from "@arco-design/web-react/es/Form/interface";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
import "./style.css";
import {formatDuration, getYoutubeVideoId} from "@/pages/FaithFlix/data.ts";
import {getReq} from "@/tools/requests.ts";


interface AddVideoModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export default function AddVideoModal(props: AddVideoModalProps) {
    const {visible, setVisible} = props;
    // const formRef = useRef();
    const formRef = useRef<FormInstance | null>(null);
    const [videoURL, setVideoURL] = React.useState("");


    function submitHandle(values: FormData): void {
        console.log(values);
    }

    function errorHandle(errors: { [key: string]: FieldError }): void {
        console.log(errors);
    }

    function getDataFromYoutube(url: string) {
        const videoId = getYoutubeVideoId(url);
        if (videoId === null) {
            Message.warning("Please input a valid Youtube URL");
            return;
        }
        console.log(videoId);
        getReq(`video-data-from-youtube?videoId=${videoId}`).then((res) => {
            if (res.status) {
                const data = res.data;
                console.log(data);
                formRef.current?.setFieldsValue({
                    title: data.snippet.title,
                    description: data.snippet.description,
                    cover_url: data.snippet.thumbnails.maxres.url,
                    duration: formatDuration(data.contentDetails.duration),
                    release_date: data.snippet.publishedAt,
                    tags: data.snippet.tags,
                    subtitles: [data.snippet.defaultAudioLanguage],
                    definition: data.contentDetails.definition,
                });
            }
        });

    }

    interface FormData {
        credits: {
            position: string;
            names: string;
        }[];
        // 其他属性
    }


    return (
        <Modal
            title="Add Video"
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            style={{width: 800, height: 750, borderRadius: 5}}
            footer={null}

        >
            <div className={"h-[660px]  overflow-y-auto overflow-x-hidden modal-form-style-fix "}>
                <Form
                    ref={formRef}
                    autoComplete='off'
                    onSubmit={submitHandle}
                    onSubmitFailed={errorHandle}
                    scrollToFirstError={true}
                    // labelAlign='right'
                    // layout='vertical'
                    initialValues={{
                        credits: [
                            {
                                position: "",
                                names: "",
                            },
                        ],
                    }}
                >
                    <FormItem label='Video URL' field="video_url" required className={"flex flex-row"}>
                        <Input allowClear
                               onChange={setVideoURL}
                               addAfter={<IconSearch className={"cursor-pointer"}
                                                     onClick={() => {
                                                         getDataFromYoutube(videoURL);
                                                     }}
                               />}/>
                    </FormItem>
                    <FormItem
                        label='Video Title' field='title' required>
                        <Input allowClear/>
                    </FormItem>
                    <FormItem label='Description' field="description" required>
                        <TextArea
                            maxLength={160}
                            showWordLimit
                            allowClear className={"resize-none"}/>
                    </FormItem>
                    <FormItem label='Cover URL' field="cover_url" required>
                        <Input allowClear/>
                    </FormItem>

                    <FormItem shouldUpdate>
                        {(value) => {
                            return <div className={"w-full flex flex-row justify-end mb-4"}>
                                <div className={"w-[28%]"}></div>
                                <div className={"w-[80%]"}>
                                    <img className={"w-32"}
                                         src={value.cover_url} alt="cover "/>
                                </div>
                            </div>;
                        }}
                    </FormItem>


                    <FormItem label='Duration' field="duration" required>
                        <TimePicker
                            placeholder='Please Select Duration'
                            style={{width: 250}}
                            showNowBtn={false}
                        />
                    </FormItem>
                    <FormItem label='Release Date' field="release_date" required>
                        {/*<DatePicker*/}
                        {/*    placeholder='Please Select Release Date'*/}
                        {/*    style={{width: 250}}*/}
                        {/*/>*/}
                        <DatePicker
                            format='YYYY-MM-DD HH:mm:ss'
                            placeholder='Please Select Release Date time'
                        />
                    </FormItem>

                    <FormItem label='Genres' field="genres" required>
                        <InputTag
                            allowClear
                            placeholder='Input and press Enter'
                        />
                    </FormItem>

                    <FormItem label='Video Tags' field="tags" required>
                        <InputTag
                            allowClear
                            placeholder='Input and press Enter'
                        />
                    </FormItem>

                    <Form.Item field='subtitles' label='Subtitle Language'>
                        <Select
                            // allowCreate
                            allowClear
                            mode='multiple'
                            options={["zh", "en"]}
                            placeholder='Please Subtitle Language'/>
                    </Form.Item>

                    {/*<Form.Item field='series' label='Series'>*/}
                    {/*    <Select*/}
                    {/*        allowCreate*/}
                    {/*        allowClear*/}
                    {/*        options={[]}*/}
                    {/*        placeholder='Please Subtitle Language' />*/}
                    {/*</Form.Item>*/}

                    <FormItem label='High Definition' field="definition" required>
                        <RadioGroup defaultValue='y'>
                            <Radio value='hd'>HD</Radio>
                            <Radio value='sd'>SD</Radio>
                        </RadioGroup>
                    </FormItem>

                    <Divider className={"m-0 mb-6"}/>

                    <Form.List field='credits'>
                        {(fields, {add, remove}) => {
                            return (
                                <div>
                                    {fields.map((item, index) => {
                                        return (
                                            <div key={item.key}>
                                                <Form.Item label={`Credit ${index + 1}`}>
                                                    <Space>
                                                        <Form.Item
                                                            field={item.field + ".position"}
                                                            rules={[{required: true}]}
                                                            noStyle
                                                            required
                                                        >
                                                            <Input
                                                                placeholder='Input Position'
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            field={item.field + ".names"}
                                                            rules={[{required: true}]}
                                                            noStyle
                                                            required
                                                        >
                                                            <InputTag
                                                                allowClear
                                                                placeholder='Input name and press Enter'
                                                                className={"w-80"}
                                                            />
                                                        </Form.Item>
                                                        <Button
                                                            icon={<IconDelete/>}
                                                            shape='circle'
                                                            status='danger'
                                                            onClick={() => remove(index)}
                                                        ></Button>
                                                    </Space>
                                                </Form.Item>
                                            </div>
                                        );
                                    })}
                                    <Form.Item wrapperCol={{offset: 5}}>
                                        <Button
                                            icon={<IconPlus/>}
                                            onClick={() => {
                                                add();
                                            }}
                                        >
                                            Add Position
                                        </Button>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>

                    <Divider className={"m-0 mb-6"}/>

                    <Form.Item label=' '>
                        <Space size={24} className={"float-right"}>
                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                            <Button
                                onClick={() => {
                                    if (formRef?.current) {
                                        formRef.current.resetFields();
                                    }
                                }}
                            >
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
}
