import { MouseEvent, useState } from 'react';
import NodeMetricList from '@/components/NodeMetricList';
import Layout from '@/components/layout';

const nodes = ['192.168.39.10', '192.168.39.11'];

const Nodes = () => {
  const [nodeIndex, setNodeIndex] = useState(0);

  const handleClick = (event: MouseEvent) => {
    const { value } = (event.target as HTMLLIElement)!;
    if (nodeIndex === value) return;
    setNodeIndex(value);
  };

  return (
    <Layout>
      <ul style={{ display: 'flex', gap: 16, listStyle: 'none', margin: '0 0 16px', padding: 0 }}>
        {nodes.map((n, i) => (
          <li
            style={{ fontWeight: nodeIndex === i ? 700 : 400 }}
            value={i}
            onClick={(e) => handleClick(e)}
          >
            {n}
          </li>
        ))}
      </ul>
      <NodeMetricList nodeName={nodes[nodeIndex]} />
    </Layout>
  );
};

export default Nodes;
