import { useEffect, useState } from "react";

import { Card, Typography, Space, Cascader, DatePicker } from '@arco-design/web-react';
import { IconUserGroup, IconCalendarClock, IconCheck } from '@arco-design/web-react/icon';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
import "./recruitment_dashboard.css";
import {getReq} from "../../../tools/requests.js";
import {getTotals} from "./dataCalculate.js";

let barChartTempData =[
        {
            label: 'Wonderkids',
            data: [700, 0, 0],
            backgroundColor: '#722ED1',
        },
        {
            label: 'Heart',
            data: [0, 100, 0],
            backgroundColor: '#722ED1',
        },
        {
            label: 'Move',
            data: [0, 100, 0],
            backgroundColor: '#F5319D',
        },
        {
            label: 'Force',
            data: [0, 100, 0],
            backgroundColor: '#FADC19',
        },
        {
            label: 'Voice',
            data: [0, 100, 0],
            backgroundColor: '#9FDB1D',
        },
        {
            label: 'Mind',
            data: [0, 100, 0],
            backgroundColor: '#3491FA',
        },
        {
            label: 'YP Zone',
            data: [0, 0, 100],
            backgroundColor: '#722ED1',
        },
        {
            label: 'Pro Family',
            data: [0, 0, 100],
            backgroundColor: '#F5319D',
        },
        {
            label: 'Young Dreamer',
            data: [0, 0, 100],
            backgroundColor: '#FADC19',
        },
        {
            label: 'Joshua Zone',
            data: [0, 0, 100],
            backgroundColor: '#9FDB1D',
        },
    ]

export default function Recruitment_Dashboard() {
    const [allData, setAllData] = useState(null);
    const [totals, setTotals] = useState([0,0,0]);
    const [barChartData, setBarChartData] = useState(barChartTempData);

    useEffect(() => {
        getReq(`/recruiters?account=admin&password=admin`).then((res) => {
            setAllData(res);
            setTotals(getTotals(res));
        });
    }, []);



    const colors = ['#722ED1', '#F5319D', '#FADC19', '#9FDB1D', '#E0FF40', '#40E0FF', '#3491FA', '#4080FF', '#FF5F40'];

    const pastoral_team = {
        overall: ["Wonderkids", "Young Warrior", "General Service"],
        young_warrior: ["Heart", "Move", "Force", "Voice", "Mind"],
        general_service: ["YP Zone", "Pro Family", "Young Dreamer", "Joshua Zone"]
    }

    const ministry = {
        overall: ["People Experience", "Creative", "Communication", "Wonderkids"],
        people_experience: ["People House", "General Affair", "Information Technology"],
        people_house: ["Usher", "Security", "Hospitality"],
        general_affair: ["Admin", "F&B", "Offering"],
        information_technology: ["Front-end Developer", "Back-end Developer", "Full Stack Developer",
            "Mobile Developer", "Product Manager", "UI/UX Designer", "Data Analyst"],
        creative: ["Production", "Arts", "Worship"],
        production: ["Stage Management", "Lighting", "Sound", "Multimedia", "Interpreter", "SET"],
        arts: ["Dance", "Fashion & Image", "Drama", "Film"],
        worship: ["Worship Leader", "Music Director", "Musician", "Vocal", "Teleprompter"],
        communication: ["Social Media", "Design"],
        wonderkids: ["Wonderkids"]
    }

    const [labels_pie, setLabels_pie] = useState(ministry['overall']);

    const options = [
        {
            value: 'overall',
            label: 'Overall',

        },
        {
            value: 'wonderkids',
            label: 'Wonderkids',

        },
        {
            value: 'young_warrior',
            label: 'Young Warrior',

        },
        {
            value: 'general_service',
            label: 'General Service',

        },
    ];

    const options_pie = [
        {
            value: 'overall',
            label: 'Overall',

        },
        {
            value: 'people_experience',
            label: 'People Experience',
            children: [
                {
                    value: 'people_house',
                    label: 'People House',
                },
                {
                    value: 'general_affair',
                    label: 'General Affair',
                },
                {
                    value: 'information_technology',
                    label: 'Information Technology',
                }
            ]
        },
        {
            value: 'creative',
            label: 'Creative',
            children: [
                {
                    value: 'production',
                    label: 'Production',
                },
                {
                    value: 'arts',
                    label: 'Arts',
                },
                {
                    value: 'worship',
                    label: 'Worship',
                }
            ]

        },
        {
            value: 'communication',
            label: 'Communication',

        },
        {
            value: 'wonderkids',
            label: 'Wonderkids',

        },
    ];

    const options_chart = {
        plugins: {
            title: {
                display: false,
                // text: 'Chart.js Bar Chart - Stacked',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const labels = ['Wonderkids', 'Young Warrior', 'General Service'];

    const data = {
        labels,
        datasets:  barChartData
    };

    const data_pie = {
        labels: labels_pie,
        datasets: [
            {
                label: '# of Applicants',
                data: labels_pie.map((label) => label.length),
                backgroundColor: colors,
            },
        ],
    };

    // console.log(data)

    // useEffect(() => {
    //     fetch(hostURL + `/recruiters?account=phoebe&password=jQ3n5P8m2x`).then(
    //         res => res.json()).then(data => {
    //             setAllData();
    //             console.log(data);
    //         });
    // }, []);

    return (
        <div className="recruitment-dashboard-con app-component">
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 30, paddingBottom: 15 }}>
                <div style={{ display: "flex", flexDirection: "column" }} >
                    <div style={{ display: "flex" }}>
                        <Card
                            hoverable>
                            <Space style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <IconUserGroup style={{
                                    width: "36px", height: "36px", backgroundColor: "#F5319D", borderRadius: "100%", padding: "10px",
                                    marginRight: "2px"
                                }} />
                                <Space style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                                    <Typography.Text>Total Applicants</Typography.Text>
                                    <Typography.Text style={{ fontWeight: 600 }}>{totals[0]}</Typography.Text>
                                </Space>
                            </Space>
                        </Card>

                        <Card
                            hoverable>
                            <Space style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <IconCalendarClock style={{
                                    width: "36px", height: "36px", backgroundColor: "#FADC19", borderRadius: "100%", padding: "10px",
                                    marginRight: "2px"
                                }} />
                                <Space style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                                    <Typography.Text>Total Pending</Typography.Text>
                                    <Typography.Text style={{ fontWeight: 600 }}>{totals[1]}</Typography.Text>
                                </Space>
                            </Space>
                        </Card>

                        <Card
                            hoverable>
                            <Space style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <IconCheck style={{
                                    width: "36px", height: "36px", backgroundColor: "#9FDB1D", borderRadius: "100%", padding: "10px",
                                    marginRight: "2px"
                                }} />
                                <Space style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                                    <Typography.Text>Total Pass</Typography.Text>
                                    <Typography.Text style={{ fontWeight: 600 }}>{totals[2]}</Typography.Text>
                                </Space>
                            </Space>
                        </Card>
                    </div>
                    <Card
                        hoverable>
                        <Space>
                            <Typography.Text style={{ fontWeight: 600 }}>Pastoral Team Summary</Typography.Text>
                            <Cascader
                                placeholder='Select Pastoral Team'
                                style={{ width: 300, marginLeft: "10px" }}
                                options={options}
                            />
                        </Space>
                        <Bar options={options_chart} data={data} />
                    </Card>
                </div >
                <Card style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center"
                }}
                    hoverable>
                    <Space style={{
                        display: "flex", flexDirection: "column", alignItems: "flex-start",
                    }}>
                        <Typography.Text style={{ fontWeight: 600 }}>Ministry Application Summary</Typography.Text>
                        <Cascader
                            placeholder='Select Team'
                            style={{ width: 350, margin: "10px 0px" }}
                            options={options_pie}
                            changeOnSelect
                            allowClear
                            showSearch
                            onChange={(value, option) => {
                                let ministry_value = value.length > 1 ? value[1] : value[0];
                                setLabels_pie(ministry[ministry_value]);
                            }}
                        />
                    </Space>
                    <Doughnut data={data_pie} />
                </Card>
            </div>
            {/*<Card style={{*/}
            {/*    display: "flex", flexDirection: "column"*/}
            {/*}}*/}
            {/*    hoverable>*/}
            {/*    <Space>*/}
            {/*        <Typography.Text style={{ fontWeight: 600 }}>Application</Typography.Text>*/}
            {/*        <DatePicker*/}
            {/*            style={{ width: 300, marginLeft: "10px" }}*/}
            {/*            defaultValue={Date.now()}*/}
            {/*            // onChange={onChange}*/}
            {/*        />*/}
            {/*    </Space>*/}
            {/*</Card>*/}
        </div>
    )
}