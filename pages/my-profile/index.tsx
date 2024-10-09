import { useEffect } from 'react';

import { ProfileSummaryItem } from '@/features/profile-info/profile-summary';
import { NextPageWithLayout } from '@/pages/_app';
import { useLazyGetMeQuery } from '@/shared/api/users-api';
import { useLazyGetUsersProfileQuery } from '@/shared/api/users-profile-api';
import { useAuthRedirect } from '@/shared/hooks/useAuthRedirect';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Typography } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { UserProfile } from '@/widgets/user-profile';
import Link from 'next/link';

// temporary placeholder

const MyProfile: NextPageWithLayout = () => {
  const { myProfile: t } = useTranslation().t;
  const [getMyProfile, { data: meResponse, isError }] = useLazyGetMeQuery();
  const [getUserProfile, { data, isError: isMyProfileError }] = useLazyGetUsersProfileQuery();

  console.log(data);

  const isAuthSuccess = useAuthRedirect();

  useEffect(() => {
    if (isAuthSuccess) {
      getMyProfile(undefined, true);
    }
  }, [isAuthSuccess, getMyProfile]);

  useEffect(() => {
    if (meResponse) {
      getUserProfile(meResponse.userName);
    }
  }, [meResponse, getUserProfile]);

  if (isError || !meResponse || isMyProfileError) {
    return <Typography.H1>Profile loading error</Typography.H1>;
  }

  if (!data) {
    return null;
  }

  const statistics = [
    { name: 'following', value: data.followingCount },
    { name: 'followers', value: data.followersCount },
    { name: 'publications', value: data.publicationsCount },
  ] as const satisfies ProfileSummaryItem[];

  const avatar = data.avatars[0].url;

  return (
    <>
      <HeadMeta title={'My Profile'} />
      <UserProfile
        aboutMe={data.aboutMe}
        avatarProps={{ url: avatar }}
        primaryAction={
          <Button
            component={'span'}
            style={{ height: '100%', width: '100%' }}
            variant={'secondary'}
          >
            <Link href={'/accounts/edit'}>{t.settingsButton}</Link>
          </Button>
        }
        statistics={statistics.map(({ name: key, value }) => ({
          name: t.statistics[key].label,
          value,
        }))}
        userName={data.userName}
      />
    </>
  );
};

MyProfile.getLayout = getLayout;

export default MyProfile;
