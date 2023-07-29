import {
  CategoryScale,
  Chart,
  ChartData,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import ChartDatasourcePrometheusPlugin from 'chartjs-plugin-datasource-prometheus';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

Chart.register(
  ChartDatasourcePrometheusPlugin,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  TimeSeriesScale,
  Legend,
  Title,
  Tooltip
);

type CustomChartProps = {
  endpoint?: string;
  query?: string;
  title?: string;
};

const CustomChart = (props: CustomChartProps) => {
  const {
    endpoint = 'http://192.168.39.10:9090',
    query = 'sum by (instance) (rate(container_cpu_usage_seconds_total[10s]) * 100)',
    title = 'Prometheus Metric Chart',
  } = props;

  const options = useMemo<ChartOptions>(() => ({
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
      'datasource-prometheus': {
        prometheus: {
          endpoint,
          baseUrl: '/api/v1',
        },
        findInLabelMap: (series) => {
          return series.labels.instance + ':' + series.labels.cpu;
        },
        query,
        stepped: 'middle',
        timeRange: {
          type: 'relative',
          start: -12 * 60 * 60 * 1000,
          end: 0,
        },
      },
    },
    responsive: true,
  }), [props]);

  const data = useMemo<ChartData<'line'>>(() => ({
    labels: [],
    datasets: [],
  }), []);

  return <Line options={options} data={data} />;
};

export default CustomChart;
