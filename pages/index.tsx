
import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { CommonLayout } from '@/widgets/Layout/CommonLayout';

import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const { error, isLoading } = useRefreshTokenQuery();

  if (isLoading) {
    return <div style={{ marginLeft: '300px' }}>Init loading...</div>;
  }

  if (error && 'status' in error && error.status === 401) {
    return <div style={{ marginLeft: '300px' }}>Unauthorized</div>;
  }

  return (
    <>
      <HeadMeta title={'main'} />
      <div style={{ marginLeft: '300px' }}>Hello World!</div>
    </>
  );
};

Home.getLayout = page => <CommonLayout>{page}</CommonLayout>;
export default Home;
