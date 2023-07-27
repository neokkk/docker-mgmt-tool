import Style from './ServerList.style';
import Card from '../ui/Card';
import { Server } from '../../schema/server';

const ServerList = () => {
  const servers: Server[] = Array.from({ length: 5 }, (_, i) => i).map((id) => ({
    id,
    hostname: 'test',
    ip_address: '192.168.39.10',
  }));

  return (
    <Style.Container>
      {servers.length > 0 ? (
        servers.map((server) => (
          <Card>
            <p>{server.hostname}</p>
            <p>{server.ip_address}</p>
          </Card>
        ))
      ) : (
        <Card>+</Card>
      )}
    </Style.Container>
  );
};

export default ServerList;
