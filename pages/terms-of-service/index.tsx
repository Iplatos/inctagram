import { AgreementContent } from '@/entities';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getBaseLayout } from '@/widgets/Layout/BaseLayout';

import { NextPageWithLayout } from '../_app';

const TermsOfService: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Terms of Service'} />
      <AgreementContent termsOfService />
    </>
  );
};

TermsOfService.getLayout = getBaseLayout;
export default TermsOfService;
