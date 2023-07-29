import CustomChart, { CustomChartProps } from '../CustomChart/CustomChart';
import Card from '../ui/Card';

const ChartCard = (props: CustomChartProps) => {
  return (
    <Card>
      <CustomChart {...props} />
    </Card>
  );
};

export default ChartCard;
