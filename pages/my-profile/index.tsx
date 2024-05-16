import { useEffect } from 'react';

import { ProfileSummaryItem } from '@/features/profile-info/profile-summary';
import { NextPageWithLayout } from '@/pages/_app';
import { useLazyMeQuery } from '@/shared/api/users-api';
import { useAuthRedirect } from '@/shared/hooks/useAuthRedirect';
import { Button, Typography } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { UserProfile } from '@/widgets/user-profile';
import Link from 'next/link';

// temporary placeholder
const statistics: ProfileSummaryItem[] = [
  { name: 'following', value: 0 },
  { name: 'followers', value: 0 },
  { name: 'publications', value: 0 },
];

const MyProfile: NextPageWithLayout = () => {
  const [getMyProfile, { data: meResponse, isError }] = useLazyMeQuery();

  const isAuthSuccess = useAuthRedirect();

  useEffect(() => {
    if (isAuthSuccess) {
      getMyProfile(undefined, true);
    }
  }, [isAuthSuccess, getMyProfile]);

  if (isError || !meResponse) {
    return <Typography.H1>Profile loading error</Typography.H1>;
  }

  const { aboutMe, avatar, username } = meResponse.data;

  return (
    <>
      <HeadMeta title={'My Profile'} />
      <UserProfile
        aboutMe={aboutMe}
        avatarProps={avatar}
        primaryAction={
          // TODO: fix button styles when it is used as span. Rename `as` prop to `component`
          <Button as={'span'} style={{ height: '100%', width: '100%' }} variant={'secondary'}>
            <Link href={'/accounts/edit'}>profile settings</Link>
          </Button>
        }
        statistics={statistics}
        userName={username}
      />
    </>
  );
};

MyProfile.getLayout = getLayout;

export default MyProfile;