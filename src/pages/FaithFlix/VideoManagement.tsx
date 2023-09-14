import UIBreadcrumb from "@/components/UIBreadcrumb";
import {Button, Image, Progress} from "@arco-design/web-react";
import {IconArchive, IconEdit, IconPlus} from "@arco-design/web-react/icon";
import { Table, TableColumnProps } from "@arco-design/web-react";
import AddVideoModal from "@/components/UI_Modal/UI_AddVideoModal/AddVideoModal.tsx";
import React, {useEffect, useState} from "react";
import AddSeriesModal from "@/components/UI_Modal/UI_AddVideoModal/AddSeriesModal.tsx";
import {AiOutlineYoutube} from "react-icons/ai";
import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";
import {getReq} from "@/tools/requests.ts";
import {getNumOfTrue, videoDataToMap, type VideoData} from "@/pages/FaithFlix/data.js";



export  default function VideoManagement() {
    const breadcrumbItems = [
        {
            name: "My Group",
            link: "/",
            clickable: false,
        },
        {
            name: "Pastoring",
            link: "/group/pastoring",
            clickable: true,
        },
    ];

    const columns: TableColumnProps[] = [
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title:"Completeness",
            render: (_, record) => {
                return (
                   <span>
                        {getNumOfTrue([record.has_subtitles, record.has_video_credits, record.has_video_tags]) ===0 &&
                            <Progress type='circle' percent={25} size={"small"} className={"whitespace-nowrap flex flex-row justify-center"} />
                        }
                       {getNumOfTrue([record.has_subtitles, record.has_video_credits, record.has_video_tags]) ===1 &&
                           <Progress type='circle' percent={50} size={"small"} className={"whitespace-nowrap flex flex-row justify-center"} />
                       }
                       {getNumOfTrue([record.has_subtitles, record.has_video_credits, record.has_video_tags]) ===2 &&
                           <Progress type='circle' percent={75} size={"small"} className={"whitespace-nowrap flex flex-row justify-center"} />
                       }
                       {getNumOfTrue([record.has_subtitles, record.has_video_credits, record.has_video_tags]) ===3 &&
                           <Progress type='circle' percent={100}   status='success' size={"small"}
                                     className={"whitespace-nowrap  flex flex-row justify-center"} />
                       }
                   </span>
                );
            },
        },
        {
            title: "cover",
            dataIndex: "cover_url",
            render: (text, record) => {
                return (
                    <img src={text} alt={record.title} className={"w-20 h-12 object-cover cursor-pointer"}
                        onClick={() =>{
                            setCurrentVideoCoverURL(text);
                            setVisible(true);
                        }}
                    />
                );
            },
        },
        {
            title: "duration",
            dataIndex: "duration",
        },
        {
            title: "release_date",
            dataIndex: "release_date",
        },
        {
            title: "viewCount",
            dataIndex: "viewCount",
        },{
            title: "Options",
            render: (_, record) => {
                return (
                    <div className={"flex flex-row justify-around"}>
                        <Button type="secondary" icon={<IconEdit
                            onClick={() =>  console.log(record)}
                        />}></Button>
                        {/*<Button type="secondary" icon={<IconArchive />}>Archive</Button>*/}
                    </div>
                );
            },
        }
    ];

    const [AddVideoModalVisible, setAddVideoModalVisible] = useState(false);
    const [AddSeriesModalVisible, setAddSeriesModalVisible] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [allVideoData, setAllVideoData] = useState<VideoData[]>([]);
    const [currentVideoCoverURL, setCurrentVideoCoverURL] = useState<string>("");
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        async function fetchData() {
            setTableLoading(true);
            const res = await  getReq("video-data-by-limit?limit=100");
            if(res.status){
                // console.log(videoDataToMap(res.data));
                const allVideoData:VideoData[] = videoDataToMap(res.data);
                // console.log(allVideoData);
                setAllVideoData(allVideoData);
            }
            else{
                console.log(res.error);
            }
            setTableLoading(false);
        }
        fetchData();
    }, []);

    function updateDBData() {
        const update = () => {
            setLoadingVisible(true);

            setTimeout(() => {
                setLoadingVisible(false);
            }, 2000);
        };

        UI_ConfirmModal(
            "Confirm",
            "Are you sure to update the new data from YouTube?",
            update,
        );
    }

    return (
        <>
            <UIBreadcrumb items={breadcrumbItems} />
            <div className="app-component full-screen-app-component p-5">
                <div className={"flex flex-row justify-between mb-3"}>
                    <div>
                        <Button type="secondary" icon={<IconPlus />}
                                onClick={() => setAddVideoModalVisible(true)}
                                className={"mr-3"}
                        >Add Video</Button>
                        <Button type="secondary" icon={<IconPlus />}
                                onClick={() => setAddSeriesModalVisible(true)}
                                className={"mr-3"}
                        >Add Series</Button>
                        <Button onClick={updateDBData} icon={<AiOutlineYoutube
                            className={"inline-block"} />}
                            loading={loadingVisible}
                        >
                            Update data
                        </Button>
                    </div>
                    <div>
                        <Button type='secondary' icon={<IconArchive />}  />
                        {/*<Button type="secondary" icon={<IconDownload />}>*/}
                        {/*    Export Data*/}
                        {/*</Button>*/}
                    </div>
                </div>
                <Table columns={columns} data={allVideoData} loading={tableLoading} />
            </div>
            <AddVideoModal visible={AddVideoModalVisible} setVisible={setAddVideoModalVisible} />
            <AddSeriesModal visible={AddSeriesModalVisible} setVisible={setAddSeriesModalVisible} />
            <Image.Preview
                src={currentVideoCoverURL}
                visible={visible}
                onVisibleChange={setVisible}
            />
        </>
    );


//     https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=rATHaPSaejE&format=json

}
