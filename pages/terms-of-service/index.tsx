import { AgreementContent } from '@/entities';
import { AuthLayout } from '@/widgets/AuthLayout/AuthLayout';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';

import { NextPageWithLayout } from '../_app';

const TermsOfService: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Terms of Service'} />
      <AgreementContent termsOfService />
    </>
  );
};

TermsOfService.getLayout = page => <AuthLayout>{page}</AuthLayout>;
export default TermsOfService;
