import {Breadcrumb, Popover} from "@arco-design/web-react";
import {IconFile, IconHome} from "@arco-design/web-react/icon";
const BreadcrumbItem = Breadcrumb.Item;
import "./UI_Breadcrumb.css"
import {useEffect, useState} from "react";
import PubSub from "pubsub-js";
import {formatTimerTime} from "../../tools/datetime.js";
import {CountdownTimer} from "../../pages/Recruitment/InterviewPage/Interview_form.jsx";
import {ifShowTimer} from "./data.js";


export  default  function UI_Breadcrumb({items}) {
    const [ifShowTimerInBar, setIfShowTimerInBar] = useState(false);

    useEffect(() => {
        function setTimer(){
            ifShowTimer().then((res) => {
                //console.log(res)
                setIfShowTimerInBar(res);
            })
        }
        setTimer();
    }, []);


    function  goToDocs() {
        window.open("https://drive.google.com/drive/folders/14sulRff83Fq2i_GnP1kGPZ3DLDyZSyb2?usp=sharing", "_blank");
    }


    return (
        <div className="breadcrumb-con" >
           <div className="breadcrumb-con-left">
               <Breadcrumb style={{marginTop:10}}>
                   <BreadcrumbItem href="/">
                       <IconHome style={{ fontSize: '16px' }} />
                   </BreadcrumbItem>
                   {
                       items.map((item, index) => {
                           if(item.clickable){
                               return <BreadcrumbItem key={index} href={item.link}>{item.name}</BreadcrumbItem>
                           }else{
                               return <BreadcrumbItem key={index} >{item.name}</BreadcrumbItem>
                           }
                       })
                   }
               </Breadcrumb>
               <div className="breadcrumb-icon-file-con">
                   <Popover
                       trigger='hover'
                       position='right'
                       content={
                           <span>
                            <div>Go to docs</div>
                        </span>
                       }
                   >
                       <IconFile className="breadcrumb-icon-file"  onClick={goToDocs} />
                   </Popover>

               </div>
           </div>
            <div className="breadcrumb-con-right">
                {ifShowTimerInBar && <CountdownTimer/>}
            </div>
        </div>
    )
}