import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import "./recruitment_appointment.css"
import {useEffect, useState} from "react";
import {getAllUsers} from "../../../tools/DB.js";
import {Button, Table} from "@arco-design/web-react";
import {filterDataHaveAppoint, getAppointTimes} from "./data.js";
import CandidateModal from "../../../components/UI_Modal/CandidateModal/CandidateModal.jsx";
import "./recruitment-appo.css"
import {useNavigate} from "react-router-dom";

export default function Recruitment_Appointment() {
    const breadcrumbItems = [
        {
            name: "Recruitment",
            link: "/",
            clickable: false
        },
        {
            name: "Interview",
            link: "/recruitment_interview",
            clickable: true
        }
    ]
    const [userData, setUserData] = useState(null);
    const [currentCandidate, setCurrentCandidate] = useState(null);
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers().then((res) => {
            let filterData = filterDataHaveAppoint(res);
            setUserData(filterData);
        });
    }, []);

    function showCandidateModal(record){
        setCurrentCandidate(record);
        setVisible(true);
    }

    function startInterview(record){
        navigate(`/recruitment_interview/form/${record._id}/1`);
    }

    const columns  = [
        {
            title: 'Name',
            dataIndex: 'info.name',
            className: "name-column",
            onCell: (record) => {
                return {
                    onClick: () => {showCandidateModal(record)}
                }
            }
        },
        {
            title: 'Ministry',
            dataIndex: 'info.ministry[2]',
        },
        {
            title: "Date time",
            dataIndex: 'appointment.ministry.appointment_time',
            render: (text, record) => (
                <span >
                    {getAppointTimes(record)}
                </span>
            )
        },
        {
            title: 'Operation',
            dataIndex: 'op',
            render: (_, record) => (
                <Button onClick={()=>startInterview(record)} type='primary'>
                    Start
                </Button>
            ),
        },
    ];


    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component full-screen-app-component">
                {
                    userData &&
                    <Table
                        columns={columns}
                        data={userData} />
                }
            </div>
            {
                currentCandidate && <CandidateModal visible={visible} setVisible={setVisible} recruiter={currentCandidate}/>
            }
        </>
    )
}