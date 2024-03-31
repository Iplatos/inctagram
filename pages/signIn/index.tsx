import { AuthLayout } from '@/widgets/AuthLayout/AuthLayout';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
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

LogIn.getLayout = page => <AuthLayout>{page}</AuthLayout>;
export default LogIn;
