import {Button, DatePicker, Divider, FormInstance, Input, Message, Modal, Select, Space} from "@arco-design/web-react";
import {Form, TimePicker, Radio} from "@arco-design/web-react";
import React, {useEffect, useRef} from "react";
import {IconDelete, IconPlus, IconSearch} from "@arco-design/web-react/icon";
import {FieldError} from "@arco-design/web-react/es/Form/interface";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
import "./style.css";
import {
    formatDuration,
    getSubtitle,
    getVideoCreditSelect,
    getVideoGenreTag,
    getYoutubeVideoId,
    VideoDBData
} from "@/pages/FaithFlix/data.ts";
import {getReq, putReq} from "@/tools/requests.ts";
import {useAddVideoModalStore} from "@/components/UI_Modal/UI_FaithFlixModals/stores/addVideoStore.ts";

const Option = Select.Option;


interface AddVideoModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

interface RoleSelectOption {
    label: string;
    value: number;
}

interface CreditsSelectOption {
    label: string;
    value: number;
}

interface GenreTagSelectOption {
    label: string;
    value: number;
}

export default function AddVideoModal(props: AddVideoModalProps) {
    const {visible, setVisible} = props;
    // const formRef = useRef();
    const formRef = useRef<FormInstance | null>(null);
    const [videoURL, setVideoURL] = React.useState("");
    const [currentVideoData, isUpdate] =
        useAddVideoModalStore((state) =>
            [state.currentVideoData, state.isUpdate]);

    const setVideoData = useAddVideoModalStore((state) => state.setVideoData);
    const [roles, setRoles] = React.useState<RoleSelectOption[]>([]);
    const [credits, setCredits] = React.useState<CreditsSelectOption[]>([]);
    const [genres, setGenres] = React.useState<GenreTagSelectOption[]>([]);
    const [tags, setTags] = React.useState<GenreTagSelectOption[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const isUseCachedData = useAddVideoModalStore((state) => state.isUseCachedData);


    useEffect(() => {
        async function getVideoData() {
            if (!currentVideoData) return;
            const subtitlePromise = getSubtitle(currentVideoData.video_id);
            const genreTagPromise = getVideoGenreTag(currentVideoData.video_id);
            const videoCreditPromise = getVideoCreditSelect(currentVideoData.video_id);

            Promise.all([subtitlePromise, genreTagPromise, videoCreditPromise])
                .then(([subtitleRes, genreTagRes, videoCreditRes]) => {
                    if (subtitleRes.status && genreTagRes.status) {
                        formRef.current?.setFieldsValue({
                            ...currentVideoData,
                            subtitles: [subtitleRes.data.language],
                            genres: genreTagRes.data.genres,
                            tags: genreTagRes.data.tags,
                            credits: videoCreditRes.data,
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        }

        if (visible && isUpdate) {
            if (isUseCachedData) {
                formRef.current?.setFieldsValue(currentVideoData);
            } else {
                getVideoData();
            }
        } else {
            formRef.current?.resetFields();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    useEffect(() => {
        const promises = [
            getReq("roles-select"),
            getReq("credits-select"),
            getReq("genre-tags-select")
        ];
        Promise.all(promises)
            .then(responses => {
                const rolesResponse = responses[0];
                const creditsResponse = responses[1];
                const genresTagsResponse = responses[2];

                if (rolesResponse.status) {
                    setRoles(rolesResponse.data);
                }

                if (creditsResponse.status) {
                    setCredits(creditsResponse.data);
                }

                if (genresTagsResponse.status) {
                    setGenres(genresTagsResponse.data.genres);
                    setTags(genresTagsResponse.data.tags);
                }
            })
            .catch(error => {
                console.error("An error occurred:", error);
            });

    }, []);

    function submitHandle(): void {
        setIsLoading(true);
        const values: Partial<VideoDBData> | undefined = formRef.current?.getFieldsValue();
        if (!values) return;
        const video_id = currentVideoData?.video_id;
        values.video_id = video_id;
        console.log(values);
        putReq(`video-data?video_id=${video_id}`, values).then((res) => {
            console.log(res);
            if (res.status) {
                setVideoData(res.data);
                setIsLoading(false);
                Message.success("Video data updated successfully");
                setVisible(false);

            }
        });
    }

    function errorHandle(errors: { [key: string]: FieldError }): void {
        Message.warning("Please check the form");
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
                                role_id: "",
                                credits_ids: "",
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
                            return <div
                                className={`w-full flex flex-row justify-end mb-4 ${value.cover_url ? "" : "hidden"}`}>
                                <div className={"w-[28%]"}></div>
                                <div className={"w-[80%]"}>
                                    <img className={"w-32 cursor-pointer"}
                                         src={value.cover_url} alt="cover"
                                         onClick={() => PubSub.publish("showVideoCover", {message: value.cover_url})}
                                    />
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
                        <DatePicker
                            format='YYYY-MM-DD HH:mm:ss'
                            placeholder='Please Select Release Date time'
                        />
                    </FormItem>

                    <FormItem label='Genres' field="genres" required>
                        <Select
                            // style={{ width: 200 }}
                            showSearch
                            allowClear
                            mode='multiple'
                            placeholder='Select Genres'
                        >
                            {genres && genres.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>

                    <FormItem label='Video Tags' field="tags" required>
                        <Select
                            // style={{ width: 200 }}
                            mode='multiple'
                            showSearch
                            allowClear
                            placeholder='Select Tags'
                        >
                            {tags && tags.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>

                    <Form.Item field='subtitles' label='Subtitle Language'>
                        <Select
                            // allowCreate
                            allowClear
                            mode='multiple'
                            options={["zh", "en"]}
                            placeholder='Please Subtitle Language'/>
                    </Form.Item>

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
                                                            field={item.field + ".role_id"}
                                                            rules={[{required: true}]}
                                                            noStyle
                                                            required
                                                        >
                                                            <Select
                                                                style={{width: 200}}
                                                                showSearch
                                                                allowClear
                                                                placeholder='Select role'
                                                            >
                                                                {roles && roles.map((option) => (
                                                                    <Option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item
                                                            field={item.field + ".credits_ids"}
                                                            rules={[{required: true}]}
                                                            noStyle
                                                            required
                                                        >
                                                            <Select
                                                                style={{width: 300}}
                                                                showSearch
                                                                allowClear
                                                                mode='multiple'
                                                                placeholder="Select names"
                                                            >
                                                                {credits && credits.map((option) => (
                                                                    <Option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </Option>
                                                                ))}
                                                            </Select>
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
                            <Button type='primary' htmlType='submit' loading={isLoading}>
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
