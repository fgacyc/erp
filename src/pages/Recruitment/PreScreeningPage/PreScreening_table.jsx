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
import UI_ConfirmModal from "../../../components/UI_Modal/UI_ConfirmModal/UI_ConfirmModal.jsx";


export  default  function PreScreening_table(){
    const [allData, setAllData] = useState([]);
    const [data, setData] = useState(allData);
    const [loading, setLoading] = useState(false);
    const [clickOption, setClickOption] = useState(false);
    const [filters, setFilters] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const inputRef = useRef(null);

    const handleStatus = (status,RID) => {
        const pre_screening_status = status ? "pre-accepted" : "pre-rejected";


        const pre_screening = {
            status: pre_screening_status,
            pre_screening_time:  getTimeStamp(),
        }

        UI_ConfirmModal("Confirm",`Are you sure to ${capitalFirstLetter(pre_screening_status)} the candidate?`,()=>{
            putReq(`/application/${RID}`, pre_screening).then((res) => {
                let newData = allData.map((item) => {
                    if (item._id === RID) {
                        item.application.status = pre_screening_status;
                        item.pre_screening.status =status;
                    }
                    return item;
                });
                setAllData(newData);
            });
        })
    }

    function postPreScreeningResult(record){

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
                            allowClear={true}
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
            onFilter: (value, row) =>{
                return row.info.pastoral_team[0] === value
            },
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
            sorter: (a, b) => a.info.ministry[2].localeCompare(b.info.ministry[2]),
            filterIcon: <IconSearch />,
            filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
                return (
                    <div className='arco-table-custom-filter'>
                        <Input.Search
                            ref={inputRef}
                            searchButton
                            placeholder='Please enter a ministry'
                            value={filterKeys[0] || ''}
                            onChange={(value) => {
                                setFilterKeys(value ? [value] : []);
                            }}
                            onSearch={() => {
                                confirm();
                            }}
                            allowClear={true}
                        />
                    </div>
                );
            },
            onFilter: (value, row) => {
                return  row.info.ministry[2].toLowerCase().includes(value.toLowerCase());
            },
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef.current.focus(), 150);
                }
            },
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
                //setPagination((pagination) => ({ ...pagination, total: permissionData.length }));
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

    function handleTableChange(pagination, sorter,filters, extra){

        if(filters.hasOwnProperty("pre_screening.status")){
            let status = filters["pre_screening.status"][0];
            if(status === null){
                filters["pre_screening.status"] = ["Pending"]
            }else if(status === true){
                filters["pre_screening.status"] = ["Pre-Accepted"]
            } else if(status === false){
                filters["pre_screening.status"] = ["Pre-Rejected"]
            }
        }

        let filterValues = Object.values(filters)
        //console.log(filterValues)
        let filterValuesStr = []
        for (let item of filterValues){
            // console.log(item)
            filterValuesStr.push(item.join(" + "))
        }

        // console.log(filterValuesStr.join(" > "))
        setFilters(filterValuesStr.join(" > "))
    }

    function clearFilters(){
        setFilters("")
        setRefreshKey(prevKey => prevKey + 1);
    }


    return(
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component pre-screening-table-con">
                <div className="table-header-bar">
                    <Button type='secondary' icon={<IconDownload />}
                            className="pre_screening-download-btn"
                            onClick={handleDownload}
                    >Download</Button>
                    <div>
                        {filters}
                        <Button type='secondary'
                                style={{marginLeft: 10}}
                                onClick={clearFilters}
                        >Clear Filters</Button>
                    </div>
                </div>
                {
                    data &&
                    <Table
                        key={refreshKey}
                        loading={loading}
                        columns={columns}
                        data={allData}
                        style={{marginBottom: 20}}
                        onChange={handleTableChange}
                    />
                }
            </div>
        </>
    )
}