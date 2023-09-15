import {BsYoutube} from "react-icons/bs";
import {Statistic} from "@arco-design/web-react";

export  default function FaithDashboard() {
    const data =  [
        {
            title: "Video",
            number: 0,
            icon:<BsYoutube size="40" />,
        },
        {
            title: "Video",
            number: 11,
            icon:<BsYoutube size="40" />,
        },
        {
            title: "Video",
            number: 222,
            icon: <BsYoutube size="40" />,
        },
        {
            title: "Video",
            number: 999,
            icon: <BsYoutube size="40" />,
        },
    ];


    return (
        <>
            <div className="app-component full-screen-app-component">
                <div className={"flex flex-row w-full justify-around mt-4 flex-wrap"}>
                    {
                        data.map((item,index) => {
                            return (
                                <div key={index} className={"flex flex-row items-center shadow w-1/5 h-20 min-w-[180px]"}>
                                    <div className={"m-4"}>{item.icon}</div>
                                    <Statistic title={item.title} value={item.number} className={"my-4"}  />
                                </div>
                            );
                        } )
                    }
                </div>
            </div>
        </>
    );
}
