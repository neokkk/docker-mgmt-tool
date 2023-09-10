import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Card from '../ui/Card/Card';
import Modal from '../ui/Modal/Modal';
import Style from './NodeMetric.style';
import { createNode, fetchNodes } from '@/apis/node';
import ChartCard from '@/components/ChartCard';
import { Node } from '@/schema/node';

const currentIpAddress = 'http://192.168.39.10:9090';

const NodeMetricList = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const nodeName = nodes[currentNodeIndex]?.name;
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeIpAddress, setNewNodeIpAddress] = useState('');

  useEffect(() => {
    fetchNodes().then(({ data }) => setNodes(data));
  }, []);

  useEffect(() => {
    if (name) {
      const index = nodes.findIndex((node) => node.name === name);
      setCurrentNodeIndex(index < 0 ? 0 : index);
    } else {
      setCurrentNodeIndex(0);
    }
  }, [name, nodes]);

  const handleClickNav = (event: MouseEvent) => {
    const { value } = (event.target as HTMLLIElement)!;
    if (currentNodeIndex === value) return;
    setCurrentNodeIndex(value);
  };

  const handleInput = (event: FormEvent) => {
    const targetName = (event.target as HTMLInputElement).name;
    if (targetName === 'name') {
      setNewNodeName((event.target as HTMLInputElement).value);
    } else if (targetName === 'ip') {
      setNewNodeIpAddress((event.target as HTMLInputElement).value);
    }
  };

  const handleSubmit = async () => {
    if (newNodeName === '' || newNodeIpAddress === '') {
      alert('Please fill out all fields');
      return;
    }

    setIsModalOpened(false);
    setNewNodeName('');
    setNewNodeIpAddress('');

    try {
      const { data } = await createNode({ name: newNodeName, ip_address: newNodeIpAddress });
      setNodes([...nodes, data]);
      navigate(`/nodes/${data.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Style.Container>
      <Style.Nav>
        {nodes.map((node, i) => (
          <NavLink
            to={node.name}
            className={({ isActive }) => (isActive || i === currentNodeIndex ? 'active' : '')}
            style={({ isActive }) =>
              isActive || i === currentNodeIndex ? { fontWeight: 'bold' } : {}
            }
            key={node.name}
            onClick={(e) => handleClickNav(e)}
          >
            {node.name}
          </NavLink>
        ))}
      </Style.Nav>

      <Style.List>
        <ChartCard
          endpoint={currentIpAddress}
          query={`count(count by (image) (container_cpu_usage_seconds_total{instance = "${nodeName}:8888", image =~ '.+'}))`}
          title="Running Containers"
          findInLabelMap={() => 'count'}
        />
        <ChartCard
          endpoint={currentIpAddress}
          query={`count(count by (id) (container_cpu_usage_seconds_total{instance = '${nodeName}:8888', id =~ '^/docker/.+'}))`}
          title="Using Images"
          findInLabelMap={() => 'count'}
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
        <Card onClick={() => setIsModalOpened(true)}>+</Card>
      </Style.List>

      <Modal
        title="Register new Node"
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        onSubmit={handleSubmit}
      >
        <label>
          <span>Node name: </span>
          <input
            type="text"
            name="name"
            value={newNodeName}
            onInput={(event) => handleInput(event)}
          />
        </label>
        <label>
          <span>Node IP: </span>
          <input
            type="text"
            name="ip"
            value={newNodeIpAddress}
            onInput={(event) => handleInput(event)}
          />
        </label>
      </Modal>
    </Style.Container>
  );
};

export default NodeMetricList;
