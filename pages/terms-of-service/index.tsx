import { AgreementContent } from '@/entities';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

import { NextPageWithLayout } from '../_app';

const TermsOfService: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Terms of Service'} />
      <AgreementContent termsOfService />
    </>
  );
};

TermsOfService.getLayout = getLayout;
export default TermsOfService;
