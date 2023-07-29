import Style from './NodeMetric.style';
import ChartCard from '../ChartCard';

const currentIpAddress = 'http://192.168.39.10:9090';

type NodeMetricListProps = {
  nodeName: string;
};

const NodeMetricList = ({ nodeName }: NodeMetricListProps) => {
  return (
    <Style.Container>
      <ChartCard
        endpoint={currentIpAddress}
        query={`count(count by (image) (container_cpu_usage_seconds_total{instance = "${nodeName}:8888", image =~ '.+'}))`}
        title="Running Containers"
        findInLabelMap={() => "count"}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={`count(count by (id) (container_cpu_usage_seconds_total{instance = '${nodeName}:8888', id =~ '^/docker/.+'}))`}
        title="Using Images"
        findInLabelMap={() => "count"}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={`rate(node_cpu_seconds_total{instance = '${nodeName}:9100', mode = 'system'}[10m])`}
        title="System CPU Usage seconds"
        findInLabelMap={(series) => `cpu${series.labels.cpu}`}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={`rate(node_cpu_seconds_total{instance = '${nodeName}:9100', mode = 'user'}[10m])`}
        title="User CPU Usage seconds"
        findInLabelMap={(series) => `cpu${series.labels.cpu}`}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={`rate(node_cpu_seconds_total{instance = '${nodeName}:9100', mode = 'idle'}[10m])`}
        title="Idle CPU Usage seconds"
        findInLabelMap={(series) => `cpu${series.labels.cpu}`}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={[
          `label_replace(node_memory_MemTotal_bytes{instance = '${nodeName}:9100'}, 'name', 'total', 'instance', '.*')`,
          `label_replace(node_memory_MemAvailable_bytes{instance = '${nodeName}:9100'}, 'name', 'available', 'instance', '.*')`,
          `label_replace(node_memory_MemFree_bytes{instance = '${nodeName}:9100'}, 'name', 'free', 'instance', '.*')`,
        ]}
        title="Memory Usage bytes"
        findInLabelMap={(series) => series.labels.name}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={`rate(node_network_receive_bytes_total{instance = '${nodeName}:9100'}[10m])`}
        title="Network I/O Receive bytes"
        findInLabelMap={(series) => series.labels.device}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={`rate(node_network_transmit_bytes_total{instance = '${nodeName}:9100'}[10m])`}
        title="Network I/O Transmit bytes"
        findInLabelMap={(series) => series.labels.device}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={[
          `label_replace(sum(rate(node_disk_read_bytes_total{instance = '${nodeName}:9100'}[10m])), 'name', 'read', 'instance', '.*')`,
          `label_replace(sum(rate(node_disk_written_bytes_total{instance = '${nodeName}:9100'}[10m])), 'name', 'write', 'instance', '.*')`,
        ]}
        title="Disk I/O Total bytes"
        findInLabelMap={(series) => series.labels.name}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={[
          `label_replace(sum(irate(node_disk_read_time_seconds_total{instance = '${nodeName}:9100'}[10m]) * 60), 'name', 'read', 'instance', '.*')`,
          `label_replace(sum(irate(node_disk_write_time_seconds_total{instance = '${nodeName}:9100'}[10m]) * 60), 'name', 'write', 'instance', '.*')`,
        ]}
        title="Disk I/O Average seconds"
        findInLabelMap={(series) => series.labels.name}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={`label_replace(rate(node_disk_read_bytes_total{instance = '${nodeName}:9100'}[10m]), 'name', 'read', 'instance', '.*')`}
        title="Disk I/O Read bytes per Device"
        findInLabelMap={(series) => series.labels.device}
      />
      <ChartCard
        endpoint={currentIpAddress}
        query={`label_replace(rate(node_disk_write_bytes_total{instance = '${nodeName}:9100'}[10m]), 'name', 'write', 'instance', '.*')`}
        title="Disk I/O Written bytes per Device"
        findInLabelMap={(series) => series.labels.device}
      />
    </Style.Container>
  );
};

export default NodeMetricList;
