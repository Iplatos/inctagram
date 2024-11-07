import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function Home() {
  return (
    <>
      <HeadMeta title={'main'} />
      <div style={{ marginLeft: '300px' }}>Hello World!</div>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;
