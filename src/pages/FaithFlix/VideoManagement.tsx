import {Button, Image, Progress} from "@arco-design/web-react";
import {IconArchive, IconEdit, IconPlus} from "@arco-design/web-react/icon";
import {Table, TableColumnProps} from "@arco-design/web-react";
import AddVideoModal from "@/components/UI_Modal/UI_FaithFlixModals/AddVideoModal.tsx";
import React, {useEffect, useState} from "react";
import AddSeriesModal from "@/components/UI_Modal/UI_FaithFlixModals/AddSeriesModal.tsx";

// import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";
import {getReq} from "@/tools/requests.ts";
import {getNumOfTrue, videoDataToMap, type VideoData} from "@/pages/FaithFlix/data.js";
import {useAddVideoModalStore} from "@/components/UI_Modal/UI_FaithFlixModals/stores/addVideoStore.ts";


export default function VideoManagement() {

    const columns: TableColumnProps[] = [
        {
            title: "Video ID",
            dataIndex: "video_id",
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Completeness",
            render: (_, record) => {
                return (
                    <span>
                        {getNumOfTrue([record.has_subtitles, record.has_video_credits, record.has_video_tags]) === 0 &&
                            <Progress type='circle' percent={25} size={"small"}
                                      className={"whitespace-nowrap flex flex-row justify-center"}/>
                        }
                        {getNumOfTrue([record.has_subtitles, record.has_video_credits, record.has_video_tags]) === 1 &&
                            <Progress type='circle' percent={50} size={"small"}
                                      className={"whitespace-nowrap flex flex-row justify-center"}/>
                        }
                        {getNumOfTrue([record.has_subtitles, record.has_video_credits, record.has_video_tags]) === 2 &&
                            <Progress type='circle' percent={75} size={"small"}
                                      className={"whitespace-nowrap flex flex-row justify-center"}/>
                        }
                        {getNumOfTrue([record.has_subtitles, record.has_video_credits, record.has_video_tags]) === 3 &&
                            <Progress type='circle' percent={100} status='success' size={"small"}
                                      className={"whitespace-nowrap  flex flex-row justify-center"}/>
                        }
                   </span>
                );
            },
        },
        {
            title: "Cover",
            dataIndex: "cover_url",
            render: (text, record) => {
                return (
                    <img src={text} alt={record.title} className={"w-20 h-12 object-cover cursor-pointer"}
                         onClick={() => {
                             setCurrentVideoCoverURL(text);
                             setVisible(true);
                         }}
                    />
                );
            },
        },
        {
            title: "Duration",
            dataIndex: "duration",
        },
        {
            title: "Release Date",
            dataIndex: "release_date",
        },
        {
            title: "View Count",
            dataIndex: "viewCount",
        }, {
            title: "Options",
            render: (_, record) => {
                return (
                    <div className={"flex flex-row justify-around "}>
                        <Button type="secondary" className="mr-2"
                                icon={<IconEdit
                                    onClick={() => {
                                        setVideoData(record);
                                        setAddVideoModalVisible(true);
                                    }}
                                />}></Button>
                        <Button type="secondary" icon={<IconArchive/>}></Button>
                    </div>
                );
            },
        }
    ];

    const [AddVideoModalVisible, setAddVideoModalVisible] = useState(false);
    const [AddSeriesModalVisible, setAddSeriesModalVisible] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [allVideoData, setAllVideoData] = useState<VideoData[]>([]);
    const [currentVideoCoverURL, setCurrentVideoCoverURL] = useState<string>("");
    const [visible, setVisible] = React.useState(false);
    const setVideoData = useAddVideoModalStore((state) => state.setVideoData);

    useEffect(() => {
        async function fetchData() {
            setLoadingVisible(true);
            const res = await getReq("video-data-by-limit?limit=100");
            if (res.status) {
                const allVideoData: VideoData[] = videoDataToMap(res.data);
                setAllVideoData(allVideoData);
            } else {
                console.log(res.error);
            }
            setLoadingVisible(false);
        }
        fetchData();
        const subscription = PubSub.subscribe("showVideoCover", (_, data) => {
            setCurrentVideoCoverURL(data.message);
            setVisible(true);
        });
        return () => {
            PubSub.unsubscribe(subscription);
        };
    }, []);


    return (
        <>
            {/*<UIBreadcrumb items={breadcrumbItems} />*/}
            <div className="app-component full-screen-app-component p-5">
                <div className={"flex flex-row justify-between mb-3"}>
                    <div>
                        <Button type="secondary" icon={<IconPlus/>}
                                onClick={() => setAddVideoModalVisible(true)}
                                className={"mr-3"}
                        >Add Video</Button>
                        {/*<Button type="secondary" icon={<IconPlus />}*/}
                        {/*        onClick={() => setAddSeriesModalVisible(true)}*/}
                        {/*        className={"mr-3"}*/}
                        {/*>Add Series</Button>*/}
                        {/*<Button onClick={updateDBData} icon={<AiOutlineYoutube*/}
                        {/*    className={"inline-block"} />}*/}
                        {/*    loading={loadingVisible}*/}
                        {/*>*/}
                        {/*    Update data*/}
                        {/*</Button>*/}
                    </div>
                    <div>
                        <Button type='secondary' icon={<IconArchive/>}/>
                        {/*<Button type="secondary" icon={<IconDownload />}>*/}
                        {/*    Export Data*/}
                        {/*</Button>*/}
                    </div>
                </div>
                <Table columns={columns} data={allVideoData} loading={loadingVisible}/>
            </div>
            <AddVideoModal visible={AddVideoModalVisible} setVisible={setAddVideoModalVisible}/>
            <AddSeriesModal visible={AddSeriesModalVisible} setVisible={setAddSeriesModalVisible}/>
            <Image.Preview
                src={currentVideoCoverURL}
                visible={visible}
                onVisibleChange={setVisible}
            />
        </>
    );



//     https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=rATHaPSaejE&format=json

}
