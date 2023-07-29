import EmbeddedCard from '@/components/EmbeddedCard';
import Layout from '@/components/layout';

const Root = () => {
  return (
    <Layout>
      <EmbeddedCard name="cpu" panelId={14} />
      <EmbeddedCard name="memory" panelId={16} />
    </Layout>
  );
};

export default Root;
