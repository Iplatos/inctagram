import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { Layout } from '@/widgets/Layout/Layout';
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

LogIn.getLayout = page => <Layout>{page}</Layout>;
export default LogIn;
