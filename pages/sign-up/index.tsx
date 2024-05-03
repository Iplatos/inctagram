import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getBaseLayout } from '@/widgets/Layout/BaseLayout';
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

SignUp.getLayout = getBaseLayout;
export default SignUp;
