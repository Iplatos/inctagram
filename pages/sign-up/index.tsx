import { AuthLayout } from '@/widgets/AuthLayout/AuthLayout';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { SignUpForm } from '@/widgets/auth/sign-up-form';

import { NextPageWithLayout } from '../_app';

const SignUp: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Sign up'} />
      <SignUpForm />
    </>
  );
};

SignUp.getLayout = page => <AuthLayout>{page}</AuthLayout>;
export default SignUp;
