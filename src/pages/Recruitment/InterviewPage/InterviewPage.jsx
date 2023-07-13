import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import "./recruitment_appointment.css"
import {useEffect, useRef, useState} from "react";
import {getAllUsers} from "../../../tools/DB.js";
import {Button, Input, Table} from "@arco-design/web-react";
import {filterDataHaveAppoint, getAppointTimes} from "./data.js";
import CandidateModal from "../../../components/UI_Modal/CandidateModal/CandidateModal.jsx";
import "./recruitment-appo.css"
import {useNavigate} from "react-router-dom";
import {putReq} from "../../../tools/requests.js";
import {IconSearch} from "@arco-design/web-react/icon";

export default function InterviewPage() {
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
    const inputRef = useRef(null);

    useEffect(() => {
        filterData().then((res) => {
            setUserData(res);
        });
    }, []);

    async function filterData(){
        let allUser = await  getAllUsers();
        return await filterDataHaveAppoint(allUser);
    }

    function showCandidateModal(record){
        setCurrentCandidate(record);
        setVisible(true);
    }

    function startInterview(record){
        let RID = record._id;
        // log the start time
        putReq(`/interview/start_time/${RID}`)
        navigate(`/recruitment_interview/form/${RID}/1`);

    }

    const columns  = [
        {
            title: 'Name',
            dataIndex: 'info.name',
            className: "name-column",
            sorter: (a, b) => a.info.name.localeCompare(b.info.name),
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            ref={inputRef}
                            searchButton
                            placeholder='Please enter a name'
                            value={filterKeys[0] || ''}
                            onChange={(value) => {
                                setFilterKeys(value ? [value] : []);
                            }}
                            onSearch={() => {
                                confirm();
                            }}
                        />
                    </div>
                );
            },
            onFilter: (value, row) => {
                return  row.info.name.toLowerCase().includes(value.toLowerCase());
            },
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef.current.focus(), 150);
                }
            },
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
            filterMultiple: false,
            render: (text, record) => (
                <span >
                    {getAppointTimes(record)}
                </span>
            )
        }
        ,
        {
            title: "Status",
            dataIndex: 'interview.status',
            filters: [
                {
                    text:  "Pending",
                    value: false ,
                },
                {
                    text:  "Interviewed",
                    value:  true,
                }
            ],
            onFilter: (value, row) =>{
                return row.interview.status === value
            },
            filterMultiple: false,
            render: (text, record) => (
                <span >
                    { record.interview.status === true
                        ? <span style={{color:"green"}}>Interviewed</span>
                        : <span >Pending</span>
                    }
                </span>
            )
        }
        ,
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