import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js';
import { Bar,Line } from 'react-chartjs-2';
// import * as faker from 'faker';
import PieChart from "./PieChart.jsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
PointElement,
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Bar Chart',
        },
    },
};

export const options1 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Line Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const data1 = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => Math.floor(Math.random() * 1001)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => Math.floor(Math.random() * 1001)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};



export  default  function Dashboard() {
     return  (
         <div style={{
            display: 'flex',
            flexDirection: 'row',
             flexWrap: 'wrap',
         }}>
             <div style={{
                 // width: '50%',
                    // height: '50%'
             }}>
                 <Bar options={options} data={data} />
             </div>

             <div style={{
                 // width: '50%',
                 // height: '50%'
             }}>
                 <Bar options={options} data={data} />
             </div>
             <div style={{
                 width: '50%',
                 // height: '50%'
             }}>
                 <PieChart />
             </div>
             <div style={{
                 width: '50%',
                 // height: '50%'
             }}>
                 <PieChart />
             </div>
         </div>
    )
}