import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import {Modal} from "@arco-design/web-react";

const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
        {
            label: 'Sales',
            data: [10, 20, 15, 30, 25],
            backgroundColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
        },
    ],
};
const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};


export default function UI_InterviewAppoInsight1({visible, setVisible,insightData}) {
    const [dataSets, setDataSets] = useState(null);

    function dataProcess(insightData){
        if (insightData === null) return;
        let datasets = [];
        for (let i = 0; i < insightData.length; i++) {
            let item = insightData[i];
            let data = {
                title: item.date,
                ministry: [],
                value: []
            }

            for (let ministry of item.ministries){
                data.ministry.push(ministry.ministry);
                data.value.push(ministry.value);
            }
            datasets.push(data);
        }
        return datasets;
    }

    useEffect(() => {
        if(insightData){
            setDataSets(dataProcess(insightData));
        }
    }, [insightData]);




    //console.log(insightData)

    return (
        <Modal
            title='Appointment Time Insight'
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            style={{width: 800}}
        >
            { dataSets && dataSets.map((item, index) => {
                return (
                    <div key={index}>
                        <div>{item.title}</div>
                        <Bar data={{
                            labels:item.ministry,
                            datasets: [
                                {
                                    label: 'Sales',
                                    data:item.value,
                                    backgroundColor: 'rgba(75,192,192,1)',
                                    borderWidth: 1,
                                },
                            ],
                        }} options={options} />
                    </div>
                )
            })}

        </Modal>
    )
}