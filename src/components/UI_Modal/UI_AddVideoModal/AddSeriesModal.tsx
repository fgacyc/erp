import {Button, DatePicker, Divider, FormInstance, Input, Modal, Select, Space} from "@arco-design/web-react";
import { Form,TimePicker,Radio ,InputTag } from "@arco-design/web-react";
import React, {useRef} from "react";
import {IconDelete, IconPlus} from "@arco-design/web-react/icon";
import {FieldError} from "@arco-design/web-react/es/Form/interface";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
import "./style.css";


interface AddVideoModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}
export default function AddSeriesModal(props: AddVideoModalProps) {
    const { visible, setVisible } = props;
    // const formRef = useRef();
    const formRef = useRef<FormInstance | null>(null);


    function submitHandle(values: FormData):void{
        console.log(values);
    }

    function errorHandle(errors: { [key: string]: FieldError }):void{
        console.log(errors);
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
            style={{ width: 800, height: 750, borderRadius: 5 }}
            footer={null}
        >
            <div className={"h-[660px]  overflow-y-auto overflow-x-hidden "}>
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
                <FormItem
                    label='Series Title' field='videoTitle' required >
                    <Input allowClear />
                </FormItem>
                <FormItem label='Description' field={"description"} required>
                    <TextArea
                        maxLength={160}
                        showWordLimit
                        allowClear className={"resize-none"} />
                </FormItem>
                <FormItem label='Video URL' required>
                    <Input  allowClear />
                </FormItem>

                <FormItem label='Cover URL' required>
                    <Input  allowClear />
                </FormItem>

                <FormItem label='Duration' required>
                    <TimePicker
                        placeholder='Please Select Duration'
                        style={{ width: 250 }}
                        showNowBtn={false}
                    />
                </FormItem>
                <FormItem label='Release Date' required>
                    <DatePicker
                        placeholder='Please Select Release Date'
                        style={{ width: 250 }}
                    />
                </FormItem>

                <FormItem label='Genres' required>
                    <InputTag
                        allowClear
                        placeholder='Input and press Enter'
                    />
                </FormItem>

                <FormItem label='Video Tags' required>
                    <InputTag
                        allowClear
                        placeholder='Input and press Enter'
                    />
                </FormItem>

                <Form.Item field='subtitles' label='Subtitle Language'>
                    <Select
                        allowCreate
                        allowClear
                        mode='multiple'
                        options={["Chinese", "English"]}
                        placeholder='Please Subtitle Language' />
                </Form.Item>

                {/*<Form.Item field='series' label='Series'>*/}
                {/*    <Select*/}
                {/*        allowCreate*/}
                {/*        allowClear*/}
                {/*        options={[]}*/}
                {/*        placeholder='Please Subtitle Language' />*/}
                {/*</Form.Item>*/}

                <FormItem label='High Definition' required>
                    <RadioGroup defaultValue='y' >
                        <Radio value='y'>YES</Radio>
                        <Radio value='n'>NO</Radio>
                    </RadioGroup>
                </FormItem>

                <Divider className={"m-0 mb-6"} />

                <Form.List field='credits'>
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((item, index) => {
                                    return (
                                        <div key={item.key}>
                                            <Form.Item label={`Credit ${index +1}`}>
                                                <Space>
                                                    <Form.Item
                                                        field={item.field + ".position"}
                                                        rules={[{ required: true }]}
                                                        noStyle
                                                        required
                                                    >
                                                        <Input
                                                            placeholder='Input Position'
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        field={item.field + ".names"}
                                                        rules={[{ required: true }]}
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
                                        icon={<IconPlus />}
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

                <Divider className={"m-0 mb-6"} />

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
