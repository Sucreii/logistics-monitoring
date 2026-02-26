<script lang="ts" setup>
import { HTTP_API } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels,
);

onMounted(async () => {
  try {
    interface DashboardData {
      [month: string]: {
        created_shipment: number;
        delivered_trips: number;
      };
    }

    const { data } = await HTTP_API().get<DashboardData>(`/dashboard/analytics`);
    const labels = Object.keys(data);
    const pendingData = labels.map((month) => data[month]?.created_shipment || 0);
    const deliveredData = labels.map((month) => data[month]?.delivered_trips || 0);

    console.log('I AM DASHBOARD: ', data);

    chartData.value = {
      labels: labels,
      datasets: [
        {
          label: 'Pending Shipment',
          data: pendingData,
          borderColor: '#36A2EB',
          backgroundColor: '#36A2EB',
          tension: 0.3,
          fill: false,
        },
        {
          label: 'Delivered Trips',
          data: deliveredData,
          borderColor: '#BC9C6D',
          backgroundColor: '#BC9C6D',
          tension: 0.3,
          fill: false,
        },
      ],
    };
  } catch (err) {
    console.error('Error fetching graph table: ', err);
    throw err;
  }
});

const chartData = ref({
  labels: ['Week 1 ', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [
    {
      label: 'Pending',
      data: [25, 35, 10, 30, 10, 34],
      borderColor: '#36A2EB',
      backgroundColor: '#36A2EB',
      tension: 0.3,
      fill: false,
    },
    {
      label: 'Delivered',
      data: [15, 25, 30, 10, 34, 80],
      borderColor: '#BC9C6D',
      backgroundColor: '#BC9C6D',
      tension: 0.3,
      fill: false,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
    },
    datalabels: {
      display: true,
      align: 'top' as const,
      color: '#444',
      font: {
        weight: 'bold' as const,
      },
      formatter: (value: number) => `${value}%`,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: string | number) => `${value}%`,
      },
    },
  },
});
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
