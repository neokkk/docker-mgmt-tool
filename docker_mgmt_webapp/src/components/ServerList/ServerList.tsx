import Style from './ServerList.style';
import Card from '../ui/Card';

const CpuCard = () => {
  return (
    <Card>
      <iframe
        src="http://localhost:3100/d-solo/htoVWdxGt/docker-cadvisor?orgId=1&refresh=5s&panelId=14"
        width="450"
        height="200"
      />
    </Card>
  );
};

const MemCard = () => {
  return (
    <Card>
      <iframe
        src="http://localhost:3100/d-solo/htoVWdxGt/docker-cadvisor?orgId=1&refresh=5s&panelId=16"
        width="450"
        height="200"
      />
    </Card>
  );
};

const ServerList = () => {
  return (
    <Style.Container>
      <CpuCard />
      <MemCard />
      <Card>+</Card>
    </Style.Container>
  );
};

export default ServerList;
