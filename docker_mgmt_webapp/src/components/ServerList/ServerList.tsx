import Style from './ServerList.style';
import CustomChart from '../CustomChart/CustomChart';
import Card from '../ui/Card';

const CpuCard = () => {
  return (
    <Card>
      <iframe
        src="http://192.168.39.10:3100/d-solo/htoVWdxGt/docker-cadvisor?orgId=1&refresh=5s&panelId=14"
        width="100%"
        height="100%"
      />
    </Card>
  );
};

const MemCard = () => {
  return (
    <Card>
      <iframe
        src="http://192.168.39.10:3100/d-solo/htoVWdxGt/docker-cadvisor?orgId=1&refresh=5s&panelId=16"
        width="100%"
        height="100%"
      />
    </Card>
  );
};

const ServerList = () => {
  return (
    <Style.Container>
      <CpuCard />
      <MemCard />
      <Card>
        <CustomChart />
      </Card>
      <Card>+</Card>
    </Style.Container>
  );
};

export default ServerList;
