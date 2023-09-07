import {Button, DatePicker, Divider, Input, Modal, Space} from "@arco-design/web-react";
import { Form,TimePicker,Radio ,InputTag } from "@arco-design/web-react";
import {useRef} from "react";
import {IconDelete} from "@arco-design/web-react/icon";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;


interface AddVideoModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}
export default function AddVideoModal(props: AddVideoModalProps) {
    const { visible, setVisible } = props;
    const formRef = useRef(null);
    return (
        <Modal
            title="Add Video"
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            style={{ width: 800, height: 750, borderRadius: 5 }}
        >
            <Form
                    ref={formRef}
                  autoComplete='off'
                    initialValues={{
                        credits: [
                            {
                                position: "",
                                names: "",
                            },
                        ],
                    }}
            >
                <FormItem label='Video Name'>
                    <Input   />
                </FormItem>
                <FormItem label='Description'>
                    <Input />
                </FormItem>
                <FormItem label='Video URL'>
                    <Input   />
                </FormItem>
                <FormItem label='Duration'>
                    <TimePicker
                        placeholder='Please Select Duration'
                        style={{ width: 250 }}
                        showNowBtn={false}
                    />
                </FormItem>
                <FormItem label='Release Date'>
                    <DatePicker
                        placeholder='Please Select Release Date'
                        style={{ width: 250 }}
                    />
                </FormItem>
                <FormItem label='Release Date'>
                    <DatePicker
                        placeholder='Please Select Release Date'
                        style={{ width: 250 }}
                    />
                </FormItem>
                <FormItem label='High Definition'>
                    <RadioGroup defaultValue='y' style={{ marginBottom: 20 }}>
                        <Radio value='y'>YES</Radio>
                        <Radio value='n'>NO</Radio>
                    </RadioGroup>
                </FormItem>
                <Divider className={"m-0 mb-6"} />

                <Form.List field='users'>
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((item, index) => {
                                    return (
                                        <div key={item.key}>
                                            <Form.Item label={`Credits type ${index +1}`}>
                                                <Space>
                                                    <Form.Item
                                                        field={item.field + ".position"}
                                                        rules={[{ required: true }]}
                                                        noStyle
                                                    >
                                                        <Input placeholder='Input position'
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        field={item.field + ".names"}
                                                        rules={[{ required: true }]}
                                                        noStyle
                                                    >
                                                        <InputTag
                                                            className={"w-80"}
                                                            allowClear
                                                            placeholder='Input names and press Enter'
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
                                        onClick={() => {
                                            add();
                                        }}
                                    >
                                        Add User
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>

            </Form>
        </Modal>
    );
}
