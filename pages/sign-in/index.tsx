import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
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

LogIn.getLayout = getLayout;
export default LogIn;
