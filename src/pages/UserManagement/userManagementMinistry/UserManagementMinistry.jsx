import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {Button, Input, Space, Table} from "@arco-design/web-react";
import {IconDelete, IconPlus, IconReply, IconSearch} from "@arco-design/web-react/icon";
import {useEffect, useRef, useState} from "react";
import {getReq} from "../../../tools/requests.js";
import {changeNameKey, changeNameKeyAndID} from "../../Events/Camp/LeaderRetreat/data.js";
import {addKeys} from "../../../tools/tableTools.js";

export  default function  UserManagementMinistry(){
    const breadcrumbItems = [
        {
            name: "Events",
            link: "/",
            clickable: false
        },
        {
            name: "Ministry management",
            link: "/users/ministry",
            clickable: true
        }
    ]

    const [data, setData] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        getReq("/ministries").then((res) => {
            if(res.status){
                let data = changeNameKeyAndID(res.data)
                setData(addKeys(data));
                console.log(data)
            }
        });
    }, []);


    const  columns = [
        {
            title: 'CYC ID',
            dataIndex: 'CYC_ID',
            sorter: (a, b) =>  a.CYC_ID <  b.CYC_ID,
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
                return  String(row.CYC_ID) === value;
            },
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef.current.focus(), 150);
                }
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
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
                return  row.name.toLowerCase().includes(value.toLowerCase());
            },
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => inputRef.current.focus(), 150);
                }
            },
        },
        {
            title: 'Ministry',
            dataIndex: 'ministry',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: "Education",
            dataIndex: "education"
        },
        // {
        //     title: 'Phone',
        //     dataIndex: 'phone_number',
        //     filterIcon: <IconSearch />,
        //     filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
        //         return (
        //             <div className='arco-table-custom-filter'>
        //                 <Input.Search
        //                     ref={inputRef}
        //                     searchButton
        //                     placeholder='Please enter a ministry'
        //                     value={filterKeys[0] || ''}
        //                     onChange={(value) => {
        //                         setFilterKeys(value ? [value] : []);
        //                     }}
        //                     onSearch={() => {
        //                         confirm();
        //                     }}
        //                     allowClear={true}
        //                 />
        //             </div>
        //         );
        //     },
        //     onFilter: (value, row) => {
        //         return  String(row.phone_number).toLowerCase().includes(value.toLowerCase());
        //     },
        //     onFilterDropdownVisibleChange: (visible) => {
        //         if (visible) {
        //             setTimeout(() => inputRef.current.focus(), 150);
        //         }
        //     },
        // },
        // {
        //     title: 'Email',
        //     dataIndex: 'email',
        //     filterIcon: <IconSearch />,
        //     filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
        //         return (
        //             <div className='arco-table-custom-filter'>
        //                 <Input.Search
        //                     ref={inputRef}
        //                     searchButton
        //                     placeholder='Please enter a ministry'
        //                     value={filterKeys[0] || ''}
        //                     onChange={(value) => {
        //                         setFilterKeys(value ? [value] : []);
        //                     }}
        //                     onSearch={() => {
        //                         confirm();
        //                     }}
        //                     allowClear={true}
        //                 />
        //             </div>
        //         );
        //     },
        //     onFilter: (value, row) => {
        //         return  row.email.toLowerCase().includes(value.toLowerCase());
        //     },
        //     onFilterDropdownVisibleChange: (visible) => {
        //         if (visible) {
        //             setTimeout(() => inputRef.current.focus(), 150);
        //         }
        //     },
        // },
        {
            title:"Operation",
            render: (text, record) => (
                <Space>
                    {
                        <Button type='secondary' icon={<IconDelete />}
                                onClick={() => console.log(record)}
                        ></Button>
                    }
                </Space>
            )
        }
    ];

    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component full-screen-app-component">
                <Button type='primary' icon={<IconPlus />}
                        style={{"margin":"10px 0"}}
                >Register new</Button>
                <Table columns={columns} data={data}
                       renderPagination={(paginationNode) => (
                           <div
                               style={{
                                   display: 'flex',
                                   justifyContent: 'space-between',
                                   marginTop: 10,
                               }}
                           >
                               <Space style={{marginLeft:16}}>
                                   { data
                                       ?<span>{data.length} Items</span>
                                       :<span>0 items</span>
                                   }
                               </Space>
                               {paginationNode}
                           </div>)}
                />
            </div>
        </>
    )
};