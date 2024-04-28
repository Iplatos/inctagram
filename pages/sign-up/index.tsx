import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { Layout } from '@/widgets/Layout/Layout';
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

SignUp.getLayout = page => <Layout>{page}</Layout>;
export default SignUp;
