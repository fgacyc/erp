import {SettingModalDivider} from "./SettingModalAccount.jsx";
import "../UI_SettingModal.css"

function ConnectionRow({item}){
    return(
        <div className="connection-table-row">
            <div style={{width:"50%",display:"flex", alignItems:"center"}}>
                <div style={{marginRight:20}}>
                    <img src={item.img} alt="connection icon"style={{width:28,height:28}} />
                </div>
                <div>
                    <div>{item.connection_name}</div>
                    <div>{item.connection_user}</div>
                </div>
            </div>
            <div style={{width:"50%"}}>{item.access}</div>
        </div>
    )
}

const data = [
    {
        connection_name:"Google Calendar",
        connection_user:"None",
        img:"/icons/calendar.png",
        access:"None"
    },
    {
        connection_name:"Google Docs",
        connection_user:"None",
        img:"/icons/docs.png",
        access:"None"
    },
    {
        connection_name:"Github",
        connection_user:"None",
        img:"/icons/github.png",
        access:"None"
    },
    {
        connection_name:"Google Calendar",
        connection_user:"None",
        img:"/icons/calendar.png",
        access:"None"
    },
    {
        connection_name:"Gmail",
        connection_user:"None",
        img:"/icons/gmail.png",
        access:"None"
    },
    {
        connection_name:"Google Calendar",
        connection_user:"None",
        img:"/icons/google-calendar.png",
        access:"None"
    },
    {
        connection_name:"Google Drive",
        connection_user:"None",
        img:"/icons/google-drive.png",
        access:"None"
    },
    {
        connection_name:"Google sheets",
        connection_user:"None",
        img:"/icons/sheets.png",
        access:"None"
    },
]


export  default function SettingModalConnections(){
    return(
        <div>
            <div  style={{marginBottom:40}}>
                <h3>My connections</h3>
                <SettingModalDivider />
                <div style={{display:"flex"}} className="connection-table-header">
                    <div style={{width:"50%"}}>Connection</div>
                    <div style={{width:"50%"}}>Access</div>
                </div>
                {
                    data.map((item, index) => {
                        return <ConnectionRow key={index} item={item} />
                    })
                }
            </div>
        </div>
    )
}