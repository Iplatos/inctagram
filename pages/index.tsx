import React from 'react';

import { ProfileForm } from '@/features/accounts/edit';
import { useGetMeQuery } from '@/shared/api/auth.service';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { useRouter } from 'next/navigation';

function Home() {
  const { t } = useTranslation();
  const { data: meData, error: meError, isLoading: isMeLoading } = useGetMeQuery();
  const router = useRouter();

  console.log(meData);
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
      <div style={{ marginLeft: '300px' }}>
        <ProfileForm />
      </div>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;
