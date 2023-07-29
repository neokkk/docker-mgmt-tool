import Style from './ContainerMetricList.style';
import ChartCard from '../ChartCard';

const currentIpAddress = 'http://192.168.39.10:9090';

type ContainerMetricListProps = {
  containerName: string;
};

const ContainerMetricList = ({ containerName }: ContainerMetricListProps) => {
  return (
    <Style.Container>
      <ChartCard
        endpoint={currentIpAddress}
        query={[
          `label_replace(avg(rate(container_cpu_system_seconds_total{name = '${containerName}'}[10m])) / avg(rate(container_cpu_usage_seconds_total{name = '${containerName}'}[10m])) * 100, 'name', 'system', 'instance', '.*')`,
          `label_replace(avg(rate(container_cpu_user_seconds_total{name = '${containerName}'}[10m])) / avg(rate(container_cpu_usage_seconds_total{name = '${containerName}'}[10m])) * 100, 'name', 'user', 'instance', '.*')`,
        ]}
        title="CPU Usage (%)"
        findInLabelMap={(series) => series.labels.name}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={[
          `label_replace(avg(container_memory_usage_bytes{name = '${containerName}'}), 'name', 'total', 'instance', '.*')`,
          `label_replace(avg(container_memory_cache{name = '${containerName}'}), 'name', 'cache', 'instance', '.*')`,
          `label_replace(avg(container_memory_usage_bytes{name = '${containerName}'}) - avg(container_memory_working_set_bytes{name = '${containerName}'}), 'name', 'free', 'instance', '.*')`,
        ]}
        title="Memory Usage bytes"
        findInLabelMap={(series) => series.labels.name}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={[
          `label_replace(avg(rate(container_network_receive_bytes_total{name = '${containerName}'}[10m])), 'name', 'receive', 'instance', '.*')`,
          `label_replace(avg(rate(container_network_transmit_bytes_total{name = '${containerName}'}[10m])), 'name', 'transmit', 'instance', '.*') `,
        ]}
        title="Network I/O bytes"
        findInLabelMap={(series) => series.labels.name}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={[
          `label_replace(avg(rate(container_fs_reads_bytes_total{name = '${containerName}'}[10m])), 'name', 'read', 'instance', '.*')`,
          `label_replace(avg(rate(container_fs_writes_bytes_total{name = '${containerName}'}[10m])), 'name', 'write', 'instance', '.*') `,
        ]}
        title="Disk I/O bytes"
        findInLabelMap={(series) => series.labels.name}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={[
          `label_replace(avg(rate(container_fs_read_seconds_total{name = '${containerName}'}[10m]) * 60), 'name', 'read', 'instance', '.*')`,
          `label_replace(avg(rate(container_fs_write_seconds_total{name = '${containerName}'}[10m]) * 60), 'name', 'write', 'instance', '.*') `,
        ]}
        title="Avg Disk I/O seconds for 60s"
        findInLabelMap={(series) => series.labels.name}
      />
    </Style.Container>
  );
};

export default ContainerMetricList;
