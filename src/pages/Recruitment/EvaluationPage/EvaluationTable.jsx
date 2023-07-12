import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {useEffect, useState} from "react";
import {getAllUsers} from "../../../tools/DB.js";
import {Button, Table} from "@arco-design/web-react";
import CandidateModal from "../../../components/UI_Modal/CandidateModal/CandidateModal.jsx";
import {useNavigate} from "react-router-dom";

export default function Recruitment_Evaluation_Table() {
    const breadcrumbItems = [
        {
            name: "Recruitment",
            link: "/",
            clickable: false
        },
        {
            name: "Evaluation",
            link: "/recruitment_evaluation",
            clickable: true
        }
    ]
    const [userData, setUserData] = useState(null);
    const [currentCandidate, setCurrentCandidate] = useState(null);
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers().then((res) => {
            //let filterData = filterDataHaveAppoint(res);
            setUserData(res);
        });
    }, []);

    function showCandidateModal(record){
        setCurrentCandidate(record);
        setVisible(true);
    }

    function startEvaluation(record){
        navigate(`/recruitment_evaluation/form/${record._id}`);
    }

    function getPassStatus(record){
        let applicationStatus = record.application.status;
        if(applicationStatus === "accepted") return "accepted";
        else if(applicationStatus === "rejected") return "rejected";
        else return "pending";
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
            title: 'Status',
            render: (_, record) => (
                <span>
                   {getPassStatus(record) === "accepted" &&
                       <span style={{color:"green"}}>Accepted</span>}
                    {getPassStatus(record) === "rejected" &&
                        <span style={{color:"red"}}>Rejected</span>}
                    {getPassStatus(record) === "pending" &&
                        <span>Pending</span>}
                </span>
            )
        },
        {
            title: 'Operation',
            dataIndex: 'op',
            render: (_, record) => (
                <Button onClick={()=>startEvaluation(record)} type='primary'
                       // disabled={record.application.status==="accepted" ||record.application.status==="rejected" }
                >
                    Evaluate
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