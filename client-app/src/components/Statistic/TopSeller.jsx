import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { GET_TOP_SELLER } from '../../api/apiStatistic';
import useGetData from '../../hooks/useGetData';
import { Pie } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TopSeller()
{
    const { responseData: topseller } = useGetData(GET_TOP_SELLER);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Top 5 món ăn thịnh hành',
            },
        },
    };

    const data = {
        labels: topseller.map(c => c.name),
        datasets: [
            {
                data: topseller.map(c => c.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(102, 255, 102, 0.4)',
                    'rgba(153, 102, 255, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(102, 255, 102, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 2,
            },
        ],
    };
    return (
        <div className="pie-chart">
            <Pie data={data} options={options} />
        </div>
    )
}
