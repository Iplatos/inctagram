import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getBaseLayout } from '@/widgets/Layout/BaseLayout';
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

LinkExpiredPage.getLayout = getBaseLayout;
export default LinkExpiredPage;
