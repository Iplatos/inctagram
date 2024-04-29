import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
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

LinkExpiredPage.getLayout = getLayout;
export default LinkExpiredPage;
