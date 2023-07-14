import {useEffect, useRef, useState} from "react";
import {Table, Input, Button, Space} from "@arco-design/web-react";
import {useNavigate} from "react-router-dom";
import { putReq} from "../../../tools/requests.js";
import {addKeys, downloadTableData, filterDataByPermissions} from "../../../tools/tableTools.js";
import {capitalFirstLetter} from "../../../tools/string.js";
import "./pre-screening.css"
import {IconDownload, IconSearch} from "@arco-design/web-react/icon";
import {getTimeStamp} from "../../../tools/datetime.js";
import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {getAllUsers} from "../../../tools/DB.js";


export  default  function PreScreening_table(){
    const [allData, setAllData] = useState([]);
    const [data, setData] = useState(allData);
    const [pagination, setPagination] = useState({
        sizeCanChange: true,
        showTotal: true,
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeChangeResetCurrent: true,
    });
    const [loading, setLoading] = useState(false);
    const [clickOption, setClickOption] = useState(false);

    const inputRef = useRef(null);

    const handleStatus = (status,RID) => {
        const pre_screening_status = status ? "pre-accepted" : "pre-rejected";

        setClickOption(!clickOption)

        const time = getTimeStamp();

        const pre_screening = {
            status: pre_screening_status,
            pre_screening_time: time,
        }

        putReq(`/application/${RID}`, pre_screening).then((res) => {
            let newData = allData.map((item) => {
                if (item._id === RID) {
                    item.application.status = pre_screening_status;
                    //console.log(item)
                }

                return item;
            });
            setAllData(newData);
        });
    }

    function goToPreScreeningPage(record) {
        navigate(`/recruitment_pre_screening/${record._id}`);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'info.name',
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
            render: (col, record) => (
                <span onClick={()=> goToPreScreeningPage(record)} className="pointer-cursor">
                   {record.info.name}
               </span>
            )
        },
        {
            title: 'Pastoral Team',
            dataIndex: 'info.pastoral_team[0]',
            filters: [
                {
                    text:  "Young Warrior",
                    value: 'young_warrior',
                },
                {
                    text:  "General Service",
                    value: 'general_service',
                },
                {
                    text:  "Wonderkids",
                    value: 'wonderkids',
                },
                {
                    text:  "Others",
                    value: 'others',
                }
            ],
            onFilter: (value, row) =>row.info.pastoral_team[0] === value,
            filterMultiple: true,
            render: (col, record) => (
                <span onClick={()=> goToPreScreeningPage(record)} className="pointer-cursor">
                    {capitalFirstLetter(record.info.pastoral_team[0])}
                </span>
            )
        },
        {
            title: 'Pastoral Zone',
            dataIndex: 'info.pastoral_team[1]',
            filters: [
                {
                    text:  "Young Warrior - Heart",
                    value: 'heart',
                },
                {
                    text:  "Young Warrior - Move",
                    value: 'move',
                },
                {
                    text:  "Young Warrior - Force",
                    value: 'force',
                },
                {
                    text:  "Young Warrior - Voice",
                    value: 'voice',
                },
                {
                    text:  "Young Warrior - Mind",
                    value: 'mind',
                },
                {
                    text:  "General Service - YP Zone",
                    value: 'yp_zone',
                },
                {
                    text:  "General Service - Pro Family",
                    value: 'pro_family',
                },
                {
                    text:  "General Service - Young Dreamer",
                    value: 'young_dreamer',
                },
                {
                    text:  "General Service - Joshua Zone",
                    value: 'joshua_zone',
                }
            ],
            onFilter: (value, row) =>{
                return row.info.pastoral_team[1] === value
            },
            filterMultiple: true,
            render: (col, record) => (
                <span onClick={()=> goToPreScreeningPage(record)} className="pointer-cursor">
                    {capitalFirstLetter(record.info.pastoral_team[1])}
                </span>
            )
        },
        {
            title: 'Ministry',
            dataIndex: 'info.ministry[2]',
        },
        {
            title: 'Status',
            dataIndex: 'pre_screening.status',
            filters: [
                {
                    text:  "Pending",
                    value: null,
                },
                {
                    text:  "Pre-Accepted",
                    value: true,
                },
                {
                    text:  "Pre-Rejected",
                    value: false,
                }
            ],
            onFilter: (value, row) =>{
                return row.pre_screening.status === value
            },
            filterMultiple: false,
            render: (col, record) => (
                <span onClick={()=> goToPreScreeningPage(record)}>
                    {
                        record.pre_screening.status === null &&
                        <span style={{color: "black"}}>Pending</span>
                    }
                    {
                        record.pre_screening.status === true &&
                        <span style={{color: "green"}}>Pre-Accepted</span>
                    }
                    {
                        record.pre_screening.status === false &&
                        <span style={{color: "red"}}>Pre-Rejected</span>
                    }
                </span>
            )
        },
        {
            title: 'Operation',
            dataIndex: 'op',
            render: (_, record) => (
                <Space>
                    <Button onClick={() =>{
                        handleStatus(true,record._id)
                    }
                    } type='secondary' status='success'>
                    Pass
                    </Button>
                    <Button onClick={() => {
                        handleStatus(false,record._id)
                    }} type='secondary' status='warning'>
                        Next time
                    </Button>
                </Space>
            ),
        }
    ];
    const navigate =  useNavigate();

    function geUserData(){
        getAllUsers().then((data) => {
            // console.log(data);
            let validData = addKeys(data)
            filterDataByPermissions(validData).then((permissionData) => {
                setAllData(permissionData);
                setPagination((pagination) => ({ ...pagination, total: permissionData.length }));
            });
        });
    }


    useEffect(() => {
        geUserData();
    }, []);

    useEffect(() => {
        geUserData();
    }, [clickOption]);

    function  handleDownload(){
        downloadTableData(allData)
    }


    function onChangeTable(pagination) {
        const { current, pageSize } = pagination;
        setLoading(true);
        setTimeout(() => {
            setData(allData.slice((current - 1) * pageSize, current * pageSize));
            setPagination((pagination) => ({ ...pagination, current, pageSize }));
            setLoading(false);
        }, 300);
    }

    const breadcrumbItems = [
        {
            name: "Recruitment",
            link: "/",
            clickable: false
        },
        {
            name: "Pre-Screening",
            link: "/recruitment_pre_screening",
            clickable: true
        }
    ]


    return(
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component pre-screening-table-con">
                <Button type='secondary' icon={<IconDownload />}
                        className="pre_screening-download-btn"
                        onClick={handleDownload}
                >Download</Button>
                {
                    data &&
                    <Table
                        loading={loading}
                        columns={columns}
                        data={allData}
                        pagination={pagination}
                        onChange={onChangeTable}
                        renderPagination={(paginationNode) => (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: 10,
                                    float: 'right',
                                }}
                            >
                                {paginationNode}
                            </div>
                        )}
                    />
                }
            </div>
        </>
    )
}