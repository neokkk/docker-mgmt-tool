import Card from '../ui/Card';

type EmbeddedCardProps = {
  name: string;
  panelId: number;
};

const EmbeddedCard = ({ name, panelId }: EmbeddedCardProps) => {
  return (
    <Card name={name}>
      <iframe
        src={`http://192.168.39.10:3100/d-solo/htoVWdxGt/docker-cadvisor?orgId=1&refresh=5s&panelId=${panelId}`}
      />
    </Card>
  );
};

export default EmbeddedCard;
