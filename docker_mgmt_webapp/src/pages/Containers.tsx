import { MouseEvent, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { fetchContainers } from '@/apis/container';
import ContainerMetricList from '@/components/ContainerMetricList';
import Layout from '@/components/layout/Layout';
import { Container } from '@/schema/container';

const Containers = () => {
  const { name } = useParams<{ name: string }>();
  const [containers, setContainers] = useState<Container[]>([]);
  const [currentContainerIndex, setCurrentContainerIndex] = useState(0);

  useEffect(() => {
    fetchContainers().then(({ data }) => setContainers(data));
  }, []);

  useEffect(() => {
    if (name) {
      const index = containers.findIndex((container) => container.name === name);
      setCurrentContainerIndex(index < 0 ? 0 : index);
    } else {
      setCurrentContainerIndex(0);
    }
  }, [name, containers]);

  const handleClick = (event: MouseEvent) => {
    const { value } = (event.target as HTMLLIElement)!;
    if (currentContainerIndex === value) return;
    setCurrentContainerIndex(value);
  };

  return (
    <Layout>
      <ul style={{ display: 'flex', gap: 16, listStyle: 'none', margin: '0 0 16px', padding: 0 }}>
        {containers.map((container, i) => (
          <NavLink
            to={container.name}
            className={({ isActive }) => (isActive || i === currentContainerIndex ? 'active' : '')}
            style={({ isActive }) =>
              isActive || i === currentContainerIndex ? { fontWeight: 'bold' } : {}
            }
            key={container.name}
            onClick={(e) => handleClick(e)}
          >
            {container.name}
          </NavLink>
        ))}
      </ul>
      <ContainerMetricList containerName={containers[currentContainerIndex]?.name} />
    </Layout>
  );
};

export default Containers;
