import {BsFillTagFill, BsPeopleFill, BsYoutube} from "react-icons/bs";
import {Statistic} from "@arco-design/web-react";
import {PiVideoFill} from "react-icons/pi";
import {ReactElement, useEffect, useState} from "react";
import {getReq} from "@/tools/requests.ts";
import {IconType} from "react-icons";
import VideoPlayCountChart from "@/pages/FaithFlix/charts/VideoPlayCountChart.tsx";

interface FaithDashboardCard{
    title: string;
    number: number;
    icon: ReactElement<IconType>;
}

export  default function FaithDashboard() {
    const [cardData, setCardData] = useState<FaithDashboardCard[]>([
        {
            title: "Videos",
            number: 0,
            icon: <PiVideoFill size="40" color={"#0D22FF"}/>,
        },
        {
            title: "Views",
            number: 0,
            icon:<BsYoutube size="40" color="#FF0000" />,
        },
        {
            title: "Credits",
            number: 0,
            icon: <BsPeopleFill size="36" color={"#19FF5A"} />,
        },
        {
            title: "Tags",
            number: 0,
            icon: <BsFillTagFill size="32" color={"#FFCE19"} />,
        },
    ]);



    useEffect(() => {
        getReq("summary").then((res) => {
            if(res.status){
                const dataList = [
                    res.data.video_num,
                    res.data.view_count,
                    res.data.credit_num,
                    res.data.tag_num,
                ];
                setCardData((prev) => {
                    return prev.map((item,index) => {
                        return {...item, number: dataList[index]};
                    });
                });
            }
        });
    }, []);


    return (
        <>
            <div className="app-component full-screen-app-component">
                <div className={"flex flex-row w-full justify-around mt-4 flex-wrap"}>
                    {
                        cardData.map((item,index) => {
                            return (
                                <div key={index} className={"flex flex-row items-center shadow w-1/5 h-20 min-w-[180px]"}>
                                    <div className={"m-4"}>{item.icon}</div>
                                    <Statistic  countUp groupSeparator
                                                styleValue={{fontSize: "20px", fontWeight: "bold"}}
                                        title={item.title} value={item.number} className={"my-4"}   />
                                </div>
                            );
                        } )
                    }
                </div>
                <div className={"m-4"}>
                    <VideoPlayCountChart />
                </div>
            </div>
        </>
    );
}
