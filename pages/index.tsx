import { ProfileForm } from '@/features/accounts/edit';
import { useGetMeQuery } from '@/shared/api/auth.service';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { CommonLayout } from '@/widgets/Layout/CommonLayout';
import { useRouter } from 'next/navigation';

import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const { data: meData, error: meError, isLoading: isMeLoading } = useGetMeQuery();
  const router = useRouter();

  if (meError) {
    if ('status' in meError) {
      meError.status === 401 && router.push('/signIn');
    }
  }
  if (isMeLoading) {
    return <div>hello</div>;
  }

  return (
    <>
      <HeadMeta title={'main'} />
    </>
  );
};

Home.getLayout = page => <CommonLayout>{page}</CommonLayout>;
export default Home;
