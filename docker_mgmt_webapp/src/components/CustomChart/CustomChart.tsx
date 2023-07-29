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
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  TimeSeriesScale,
  ChartDatasourcePrometheusPlugin,
  Legend,
  Title,
  Tooltip
);

export type CustomChartProps = {
  endpoint: string;
  query: string | string[];
  title: string;
  findInLabelMap?: (series: any) => string;
};

const CustomChart = (props: CustomChartProps) => {
  const { endpoint, query, title, findInLabelMap } = props;
  const options = useMemo<ChartOptions>(
    () => ({
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
          findInLabelMap: (series: any) => {
            return findInLabelMap
              ? findInLabelMap(series)
              : `${series.labels.instance || series.labels.cpu}:${
                  series.labels.type || series.labels.cpu || ''
                }`;
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
    }),
    [props]
  );

  const data = useMemo<ChartData<'line'>>(
    () => ({
      labels: [],
      datasets: [],
    }),
    []
  );

  return <Line options={options} data={data} />;
};

export default CustomChart;
