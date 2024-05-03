import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getBaseLayout } from '@/widgets/Layout/BaseLayout';
import { SignInForm } from '@/widgets/auth/sign-in-form/sign-in-form';

import { NextPageWithLayout } from '../_app';

const LogIn: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Sign in'} />
      <SignInForm />
    </>
  );
};

LogIn.getLayout = getBaseLayout;
export default LogIn;
