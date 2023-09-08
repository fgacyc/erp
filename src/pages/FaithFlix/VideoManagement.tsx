import UIBreadcrumb from "@/components/UIBreadcrumb";
import { Button } from "@arco-design/web-react";
import {IconDownload, IconPlus} from "@arco-design/web-react/icon";
import { Table, TableColumnProps } from "@arco-design/web-react";
import AddVideoModal from "@/components/UI_Modal/UI_AddVideoModal/AddVideoModal.tsx";
import { useState} from "react";
import AddSeriesModal from "@/components/UI_Modal/UI_AddVideoModal/AddSeriesModal.tsx";
import { useGoogleLogin } from "@react-oauth/google";
import {AiOutlineYoutube} from "react-icons/ai";



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
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Salary",
            dataIndex: "salary",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
    ];

    const data = [
        {
            key: "1",
            name: "Jane Doe",
            salary: 23000,
            address: "32 Park Road, London",
            email: "jane.doe@example.com",
        },
        {
            key: "2",
            name: "Alisa Ross",
            salary: 25000,
            address: "35 Park Road, London",
            email: "alisa.ross@example.com",
        },
        {
            key: "3",
            name: "Kevin Sandra",
            salary: 22000,
            address: "31 Park Road, London",
            email: "kevin.sandra@example.com",
        },
        {
            key: "4",
            name: "Ed Hellen",
            salary: 17000,
            address: "42 Park Road, London",
            email: "ed.hellen@example.com",
        },
        {
            key: "5",
            name: "William Smith",
            salary: 27000,
            address: "62 Park Road, London",
            email: "william.smith@example.com",
        },
    ];

    const [AddVideoModalVisible, setAddVideoModalVisible] = useState(false);
    const [AddSeriesModalVisible, setAddSeriesModalVisible] = useState(false);
    const [access_token, setAccess_token] = useState("");
    const [loadingVisible, setLoadingVisible] = useState(false);

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse);
            setAccess_token(tokenResponse.access_token);
            searchYoutubeData();
        }
    });

    function fetchYoutubeData() {
        //if(access_token ==="") googleLogin();
        setLoadingVisible(true);
        googleLogin();
    }

    // useEffect(() => {
    //     console.log(access_token);
    //     searchYoutubeData();
    // }, [access_token]);



    function searchYoutubeData() {
        const apiKey = import.meta.env["VITE_YOUTUBE_API_KEY"];
        const channelId = "UCZ4K-jz9L3gd5XDWih3gSTQ";
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&type=video&maxResults=50`;
        // &pageToken=CDIQAA

        //const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`;

        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}` // 替换为你的访问令牌
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLoadingVisible(false);
            })
            .catch(error => {
                console.error("发生错误:", error);
            });
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

                        <Button onClick={fetchYoutubeData} icon={<AiOutlineYoutube
                            className={"inline-block"} />}
                                loading={loadingVisible}
                        >
                            Fetch new data
                        </Button>
                    </div>
                    <Button type="secondary" icon={<IconDownload />}>
                        Export Data
                    </Button>
                </div>
                <Table columns={columns} data={data} />
            </div>
            <AddVideoModal visible={AddVideoModalVisible} setVisible={setAddVideoModalVisible} />
            <AddSeriesModal visible={AddSeriesModalVisible} setVisible={setAddSeriesModalVisible} />
        </>
    );


//     https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=rATHaPSaejE&format=json

}
