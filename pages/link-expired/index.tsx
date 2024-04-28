import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { Layout } from '@/widgets/Layout/Layout';
import { RedirectContent } from '@/widgets/auth';

import { NextPageWithLayout } from '../_app';

const LinkExpiredPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Link Expired'} />
      <RedirectContent linkExpired />
    </>
  );
};

LinkExpiredPage.getLayout = page => <Layout>{page}</Layout>;
export default LinkExpiredPage;
