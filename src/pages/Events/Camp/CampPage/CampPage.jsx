import UI_Breadcrumb from "../../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {Button, Card, Input, Space} from '@arco-design/web-react';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getReq} from "../../../../tools/requests.js";
const InputSearch = Input.Search;

export function ButtonGroup({currentActive, setCurrentActive}){
    return(
        <>
            <Space>
                { currentActive === 0
                    ? <Button shape='round' type='secondary'>All</Button>
                    : <Button shape='round' type='text'
                              style={{color:"black"}}
                              onClick={() => setCurrentActive(0)}
                    >All</Button>
                }
                { currentActive === 1
                    ? <Button shape='round' type='secondary'>In progress</Button>
                    : <Button shape='round' type='text'
                              style={{color:"black"}}
                              onClick={() => setCurrentActive(1)}
                    >In progress</Button>
                }
                { currentActive === 2
                    ? <Button shape='round' type='secondary'>Finished</Button>
                    : <Button shape='round' type='text'
                              style={{color:"black"}}
                              onClick={() => setCurrentActive(2)}
                    >Finished</Button>
                }
            </Space>
        </>
    )
}

function CampCard({created,started, finished, title, url}){
    const  navigate = useNavigate();
    const [participants, setParticipants] = useState(0);

    useEffect(() => {
        getReq(`${url}/number`).then((res) => {
            if(res.status){
                setParticipants(res.data.leader_retreat_num);
            }
        });
    }, []);

    return (
        <Card style={{ width: 360 }}
              title={title}
              hoverable
        >
            <div>Participants: {participants}</div>
            <div className="flex-csb" style={{marginTop:30}}>
                <div style={{fontSize:12}}>
                    <div>Started: {started}</div>
                    <div>Created: {created}</div>
                </div>
                <Button type='primary'
                        onClick={() => {navigate(url)}}
                >View</Button>
            </div>
            {finished && <div>Finished: {finished}</div>}
        </Card>
    )
}

export default function CampPage() {
    const breadcrumbItems = [
        {
            name: "Events",
            link: "/",
            clickable: false
        },
        {
            name: "Camp",
            link: "/events/camp",
            clickable: true
        }
    ]
    const [currentActive, setCurrentActive] = useState(0);

    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component full-screen-app-component"
            >
                <div style={{margin:"20px 20px 0 20px", fontSize:26,fontWeight:"bold"}}>Camps</div>
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
                        <CampCard title={"Leader Retreat"}
                                  created={"2023-08-02 18:30:00"}
                                  started={"2023-11-01 18:30:00"}
                                  url={"/events/camp/leader_retreat"}

                        />
                    </div>
                </div>
            </div>
        </>
    )
}