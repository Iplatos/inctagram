import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
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

SignUp.getLayout = getLayout;
export default SignUp;
