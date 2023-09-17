import {Button, Image, Message, Progress} from "@arco-design/web-react";
import {IconArchive, IconCheckSquare, IconEdit, IconPlus} from "@arco-design/web-react/icon";
import {Table, TableColumnProps} from "@arco-design/web-react";
import AddVideoModal from "@/components/UI_Modal/UI_FaithFlixModals/AddVideoModal.tsx";
import React, {useEffect, useState} from "react";

// import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";
import {getReq, putReq} from "@/tools/requests.ts";
import {videoDataToMap, type VideoData, VideoDBData, culVideoProcess} from "@/pages/FaithFlix/data.js";
import {useAddVideoModalStore, VideoFormData} from "@/components/UI_Modal/UI_FaithFlixModals/stores/addVideoStore.ts";


export default function VideoManagement() {

    const columns: TableColumnProps[] = [
        {
            title: "ID",
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
                        {culVideoProcess(record) === 0 &&
                            <Progress type='circle' percent={20} size={"small"}
                                      className={"whitespace-nowrap flex flex-row justify-center"}/>
                        }
                        {culVideoProcess(record) === 1 &&
                            <Progress type='circle' percent={40} size={"small"}
                                      className={"whitespace-nowrap flex flex-row justify-center"}/>
                        }
                        {culVideoProcess(record) === 2 &&
                            <Progress type='circle' percent={60} size={"small"}
                                      className={"whitespace-nowrap flex flex-row justify-center"}/>
                        }
                        {culVideoProcess(record) === 3 &&
                            <Progress type='circle' percent={80} status='success' size={"small"}
                                      className={"whitespace-nowrap  flex flex-row justify-center"}/>
                        }
                        {culVideoProcess(record) === 4 &&
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
                                        handleEdit(record);
                                    }}
                                />}></Button>
                        {
                            record.archived
                                ? <Button type="secondary" icon={<IconCheckSquare/>}
                                            onClick={() => updateArchivedStatus(record, false)}
                                ></Button>
                                : <Button type="secondary" icon={<IconArchive/>}
                                            onClick={() => updateArchivedStatus(record, true)}
                                ></Button>
                        }

                    </div>
                );
            },
        }
    ];

    const [AddVideoModalVisible, setAddVideoModalVisible] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [allVideoArchivedData, setAllVideoArchivedData] = useState<VideoData[]>([]);
    const [allVideoAvailableData, setAllVideoAvailableData] = useState<VideoData[]>([]);
    const [currentVideoCoverURL, setCurrentVideoCoverURL] = useState<string>("");
    const [visible, setVisible] = React.useState(false);
    const [currentVideoData, setVideoData] = useAddVideoModalStore((state) => [
        state.currentVideoData, state.setVideoTableData
    ]);
    const setCachedData = useAddVideoModalStore((state) => state.setCachedData);
    const resetVideoData = useAddVideoModalStore((state) => state.resetVideoData);
    const setIsUpdate = useAddVideoModalStore((state) => state.setIsUpdate);
    const [currentDisplay, setCurrentDisplay] = useState("available");
    const [currentDisplayData, setCurrentDisplayData] = useState<VideoData[]>(allVideoAvailableData);

    useEffect(() => {
        async function fetchData() {
            setLoadingVisible(true);
            const res = await getReq("video-data-by-limit?limit=100");
            if (res.status) {
                // console.log(res.data);
                const allVideoData: VideoData[] = videoDataToMap(res.data);
                const allVideoArchivedData = allVideoData.filter((video) => video.archived);
                const allVideoAvailableData = allVideoData.filter((video) => !video.archived);
                setAllVideoArchivedData(allVideoArchivedData);
                setAllVideoAvailableData(allVideoAvailableData);
                setCurrentDisplayData(allVideoAvailableData);
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

        const subscription1 = PubSub.subscribe("updateProcess", (_, data) => {
            updateTableItemProcess(data.message);
        });
        return () => {
            PubSub.unsubscribe(subscription);
            PubSub.unsubscribe(subscription1);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleEdit(record: VideoDBData) {
        setIsUpdate(true);
        if (currentVideoData !== null) {
            if (currentVideoData.video_id === record.video_id) {
                // console.log("use cached data");
                setCachedData(true);
            } else {
                setCachedData(false);
                setVideoData(record);
            }
        } else {
            setCachedData(false);
            setVideoData(record);
        }
        setAddVideoModalVisible(true);
    }

    function handleShowArchived() {
        if (currentDisplay === "available") {
            setCurrentDisplay("archived");
            setCurrentDisplayData(allVideoArchivedData);
        } else {
            setCurrentDisplay("available");
            setCurrentDisplayData(allVideoAvailableData);
        }
    }

    useEffect(() => {
        if (currentDisplay === "available") {
            setCurrentDisplayData(allVideoAvailableData);
        }else{
            setCurrentDisplayData(allVideoArchivedData);
        }

    }, [allVideoArchivedData, allVideoAvailableData, currentDisplay]);

    function updateTableItemProcess(data:VideoFormData){
        const newAllVideoArchivedData :VideoData[] = allVideoArchivedData.map((video:VideoData) => {
            const videoObj:VideoFormData = data;
            if (video.video_id === videoObj.video_id) {
                video.has_video_credits = !!videoObj.credits;
                video.has_subtitles = !!videoObj.subtitles;
                video.has_video_tags = !!videoObj.tags;
                video.description = videoObj.description;
                console.log(video);
            }

            return video;
        });
        setAllVideoArchivedData(newAllVideoArchivedData);
    }

    function updateArchivedStatus(record: VideoData, archived: boolean) {
            if(culVideoProcess(record) !== 4 && !archived){
                Message.warning("video is not completed yet");
                return;
            }

            const  video_id = record.video_id;
            putReq(`video-data/update-archive-status?video_id=${video_id}`, {status:archived}).then((res) => {
                if (res.status) {
                    Message.success("update archived status successfully");
                    if(archived){ // hide
                        const newAllVideoAvailableData = allVideoAvailableData.filter((video) => video.video_id !== video_id);
                        setAllVideoAvailableData(newAllVideoAvailableData);
                        setAllVideoArchivedData([...allVideoArchivedData, ...allVideoAvailableData.filter((video) => video.video_id === video_id)]);
                    }else{
                        const newAllVideoArchivedData = allVideoArchivedData.filter((video) => video.video_id !== video_id);
                        setAllVideoArchivedData(newAllVideoArchivedData);
                        setAllVideoAvailableData([...allVideoAvailableData, ...allVideoArchivedData.filter((video) => video.video_id === video_id)]);
                    }
                } else {
                    Message.warning("update archived status failed");
                }
            });
    }

    return (
        <>
            {/*<UIBreadcrumb items={breadcrumbItems} />*/}
            <div className="app-component full-screen-app-component p-5">
                <div className={"flex flex-row justify-between mb-3"}>
                    <div>
                        <Button type="secondary" icon={<IconPlus/>}
                                onClick={() => {
                                    setIsUpdate(false);
                                    resetVideoData();
                                    setAddVideoModalVisible(true);
                                }}
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
                    <div className={"flex flex-row items-center"}>
                        <div className={"mr-2"}>{currentDisplay.toUpperCase()}</div>
                        {
                            currentDisplay === "available"
                            ? <Button type='secondary' icon={<IconArchive/>}
                                      onClick={handleShowArchived}
                            />
                            : <Button type='secondary' icon={<IconCheckSquare/>}
                                      onClick={handleShowArchived}
                            />
                        }

                        {/*<Button type="secondary" icon={<IconDownload />}>*/}
                        {/*    Export Data*/}
                        {/*</Button>*/}
                    </div>
                </div>
                <Table columns={columns} data={currentDisplayData} loading={loadingVisible}/>
            </div>
            <AddVideoModal visible={AddVideoModalVisible} setVisible={setAddVideoModalVisible}/>
            <Image.Preview
                src={currentVideoCoverURL}
                visible={visible}
                onVisibleChange={setVisible}
            />
        </>
    );


//     https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=rATHaPSaejE&format=json

}
