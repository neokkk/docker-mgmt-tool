import { MouseEvent, useState } from 'react';
import ContainerMetricList from '@/components/ContainerMetricList';
import Layout from '@/components/layout';

const containers = ['prometheus', 'grafana', 'cadvisor', 'node_exporter'];

const Containers = () => {
  const [containerIndex, setContainerIndex] = useState(0);

  const handleClick = (event: MouseEvent) => {
    const { value } = (event.target as HTMLLIElement)!;
    if (containerIndex === value) return;
    setContainerIndex(value);
  };

  return (
    <Layout>
      <ul style={{ display: 'flex', gap: 16, listStyle: 'none', margin: '0 0 16px', padding: 0 }}>
        {containers.map((c, i) => (
          <li
            style={{ fontWeight: containerIndex === i ? 700 : 400, cursor: 'pointer' }}
            value={i}
            onClick={(e) => handleClick(e)}
          >
            {c}
          </li>
        ))}
      </ul>
      <ContainerMetricList containerName={containers[containerIndex]} />
    </Layout>
  );
};

export default Containers;
