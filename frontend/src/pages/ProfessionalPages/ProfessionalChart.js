import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProfessionalBarChart = ({ dashboardData }) => {
    // Check if dashboardData is available before rendering
    if (!dashboardData) {
        return <p>Loading...</p>; // Show loading state if dashboardData is undefined
    }

    const chartData = {
        labels: ['Total Patients', 'In-Patients', 'Out-Patients', 'Appointments', 'Today\'s Appointments'],
        datasets: [
            {
                label: 'Professional Dashboard Metrics',
                data: [
                    dashboardData.numberOfPatients || 0,
                    dashboardData.numberOfInpatients || 0,
                    dashboardData.numberOfOutpatients || 0,
                    dashboardData.numberOfAppointments || 0,
                    dashboardData.todayAppointments || 0,
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Slightly transparent fill color
                borderColor: 'rgba(54, 162, 235, 1)', // Border color
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top', // Display the legend at the top
            },
            title: {
                display: true,
                text: 'Professional Dashboard Overview',
                font: {
                    size: 18, // Increased title font size
                },
            },
            tooltip: {
                enabled: true, // Enables tooltips when hovering over data points
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        return `${label}: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Metrics',
                    font: {
                        size: 14, // X-axis label font size
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Values',
                    font: {
                        size: 14, // Y-axis label font size
                    },
                },
                beginAtZero: true, // Ensures that the chart starts from 0
                ticks: {
                    stepSize: 1, // Ensures that the Y-axis steps by 1
                },
            },
        },
        maintainAspectRatio: false, // Allows more control over chart size
    };

    return <div style={{ height: '400px', width: '100%' }}><Bar data={chartData} options={options} /></div>;
};

export default ProfessionalBarChart;
