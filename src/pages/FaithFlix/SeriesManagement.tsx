
import { Button } from "@arco-design/web-react";
import { IconDelete, IconEdit, IconPlus} from "@arco-design/web-react/icon";
import { Table, TableColumnProps } from "@arco-design/web-react";
import React, {useEffect, useState} from "react";
import AddSeriesModal from "@/components/UI_Modal/UI_FaithFlixModals/AddSeriesModal.tsx";
import PubSub from "pubsub-js";
import {deleteReq, getReq} from "@/tools/requests.ts";
import {useAddSeriesModalStore} from "@/components/UI_Modal/UI_FaithFlixModals/stores/addSeriesModalStore.ts";

export  function ExpandedRowRender(videos:EpisodeData[]) {


    const columns: TableColumnProps[] =[
        {
            title: "Episode Number",
            dataIndex: "episode_number",
        },
        {
            title: "Video Title",
            dataIndex: "video_title",
        },
    ];



    return <Table columns={columns} data={videos} pagination={false} />;
}

export interface EpisodeData {
    key: number;
    episode_number: number;
    video_id: number;
    video_title: string;
}

export interface SeriesData{
    series_name: string;
    series_description: string;
    videos: EpisodeData[];
}


export  default function SeriesManagement() {
    const columns: TableColumnProps[] = [
        {
            title: "Series Name",
            dataIndex: "series_name",
        },
        {
            title: "Series Description",
            dataIndex: "series_description",
        },
        {
            title: "Options",
            render: (_, record) => {
                return (
                    <div className={"flex flex-row justify-start "}>
                        <Button type="secondary" className="mr-2"
                                icon={<IconEdit
                                    onClick={() => {
                                        handleEdit(record);
                                    }}
                                />}></Button>
                        <Button type="secondary" icon={<IconDelete />}
                                onClick={() =>deleteSeries(record.series_id)}
                        ></Button>

                    </div>
                );
            },
        }
    ];
    const [AddSeriesModalVisible, setAddSeriesModalVisible] = useState(false);
    const [allData, setAllData] = useState<SeriesData[]>([]);
    const setEpisodeData = useAddSeriesModalStore((state) => state.setEpisodeData);

    useEffect(() => {
        updateSeriesData();
        const subscription = PubSub.subscribe("updateSeriesData", () => {
            updateSeriesData();
        });
        return () => {
            PubSub.unsubscribe(subscription);
        };
    }, []);

    function updateSeriesData(){
        getReq("video-series").then((res) => {
            if(res.status){
                console.log(res.data);
                setAllData(res.data);
            }
        });
    }

    function handleEdit(record: SeriesData){
        // console.log(record);
        setEpisodeData(record);
        setAddSeriesModalVisible(true);
    }

    function deleteSeries(series_id:number){
        deleteReq(`video-series?series_id=${series_id}`).then((res) => {
            console.log(res);
            if(res.status){
                updateSeriesData();
            }
        });
    }


    return (
        <>
            {/*<UIBreadcrumb items={breadcrumbItems} />*/}
            <div className="app-component full-screen-app-component p-5">
                <div className={"flex flex-row justify-between mb-3"}>
                    <div>
                        <Button type="secondary" icon={<IconPlus />}
                                onClick={() => setAddSeriesModalVisible(true)}
                                className={"mr-3"}
                        >Add Series</Button>
                        <Button type="secondary" icon={<IconPlus />}
                                onClick={() => updateSeriesData()}
                                className={"mr-3"}
                        >update</Button>
                    </div>
                </div>
                <Table columns={columns}
                       data={allData}
                       expandedRowRender={
                            (record) => ExpandedRowRender(record.videos)
                       }
                />
            </div>
            <AddSeriesModal
                visible={AddSeriesModalVisible}
                setVisible={setAddSeriesModalVisible}
            />
        </>
    );


//     https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=rATHaPSaejE&format=json

}
