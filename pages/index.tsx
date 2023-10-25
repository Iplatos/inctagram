import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';

function Home() {
  return (
    <>
      <HeadMeta title={'main'} />
      <h1>Home page</h1>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;
