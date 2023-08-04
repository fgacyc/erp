import UI_Breadcrumb from "../../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {useState} from "react";
import {ButtonGroup} from "../../Camp/CampPage/CampPage.jsx";
import {Input} from "@arco-design/web-react";
const InputSearch = Input.Search;

export default function EvangelismPage() {
    const breadcrumbItems = [
        {
            name: "Events",
            link: "/",
            clickable: false
        },
        {
            name: "Evangelism",
            link: "/events/evangelism",
            clickable: true
        }
    ]
    const [currentActive, setCurrentActive] = useState(0);

    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component full-screen-app-component">
                <div style={{margin:"20px 20px 0 20px", fontSize:26,fontWeight:"bold"}}>Evangelism</div>
                <div style={{boxSizing:"border-box",padding:20}}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <ButtonGroup currentActive={currentActive} setCurrentActive={setCurrentActive} />
                        <InputSearch allowClear placeholder='Type to search' style={{ width: 350 }} />
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}