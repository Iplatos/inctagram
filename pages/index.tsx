import { Typography } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function Home() {
  return (
    <>
      <HeadMeta title={'main'} />
      <Typography.H1>Hello World!</Typography.H1>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;
