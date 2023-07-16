import React from 'react';
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
            <div>
                <div>Hii</div>
                <Bar data={data} options={options} />
            </div>

        </Modal>
    )
}