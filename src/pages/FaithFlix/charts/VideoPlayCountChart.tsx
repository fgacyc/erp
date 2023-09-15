/*
const VideoPlayCountChart: React.FC = () => {
    // 假设你有一个包含两周内每天视频播放量的数据数组
    const data = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14"],
        datasets: [
            {
                label: "视频播放量",
                data: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
            },
        ],
    };

    return (
        <div>
            <h2>两周内视频播放量</h2>
            <Line
                data={data}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default VideoPlayCountChart;
*/


import React from "react";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
            display: false
        },
        title: {
            display: true,
            text: "Video Views",
        },
    },
    tension:0.5,
};

const generateRandomData = () => {
    return Array.from({length: 14}, () => Math.floor(Math.random() * 1000));
};

const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14"],
    datasets: [
        {
            label: "Dataset 1",
            data: generateRandomData(),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        }
    ],
};

export default function VideoPlayCountChart() {
    return <Line options={options} data={data} />;
}

