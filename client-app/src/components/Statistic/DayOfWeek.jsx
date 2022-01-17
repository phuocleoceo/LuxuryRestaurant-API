import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { GET_SALES_PER_DOW } from '../../api/apiStatistic';
import useGetData from '../../hooks/useGetData';
import { Bar } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Doanh thu từng ngày trong tuần',
        },
    },
};

const labels = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư',
    'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

export default function DayOfWeek()
{
    const { responseData: sales } = useGetData(GET_SALES_PER_DOW);

    const data = {
        labels,
        datasets: [
            {
                label: 'Doanh thu',
                data: Object.keys(sales).map(key => sales[key]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)',
                    'rgba(102, 255, 102, 0.5)', 'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 206, 86, 0.5)'],
                borderColor: [
                    'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
                    'rgba(102, 255, 102, 1)', 'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
                    'rgba(255, 206, 86, 1)'],
                borderWidth: 2
            },
        ],
    };
    return (
        <Bar options={options} data={data}
            width={50} height={20} />
    )
}
