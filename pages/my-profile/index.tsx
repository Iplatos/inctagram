import { useEffect } from 'react';

import { ProfileSummaryItem } from '@/features/profile-info/profile-summary';
import { NextPageWithLayout } from '@/pages/_app';
import { useLazyGetPostsQuery } from '@/shared/api/posts-api';
import { useLazyGetMeQuery, useLazyGetUserProfileQuery } from '@/shared/api/users-api';
import { useAuthRedirect } from '@/shared/hooks/useAuthRedirect';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Typography } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getPrivateLayout } from '@/widgets/layouts';
import { UserProfile } from '@/widgets/user-profile';
import Link from 'next/link';

const MyProfile: NextPageWithLayout = () => {
  const { myProfile: t } = useTranslation().t;
  const [getMe, { data: meResponse, isError: isMeDataError, isLoading: isLoadingProfile }] =
    useLazyGetMeQuery();
  const [getPosts, { data: postsResponse, isError: isPostsError, isLoading: isLoadingPosts }] =
    useLazyGetPostsQuery();
  const [getUserProfile, { data, isError: isMyProfileError, isLoading: isLoadingUser }] =
    useLazyGetUserProfileQuery();

  const isAuthSuccess = useAuthRedirect();

  useEffect(() => {
    if (isAuthSuccess) {
      getMe(undefined, true);
    }
  }, [isAuthSuccess, getMe]);

  useEffect(() => {
    if (meResponse) {
      getUserProfile(meResponse.userName);
      getPosts({ userName: meResponse.userName });
    }
  }, [meResponse, getUserProfile, getPosts]);

  if (isLoadingPosts || isLoadingProfile || isLoadingUser) {
    // console.log(isLoadingPosts || isLoadingProfile || isLoadingUser);

    return <div>Loading...</div>;
  }

  // if (isMeDataError || !meResponse || isMyProfileError) {
  //   return <Typography.H1>Profile loading error</Typography.H1>;
  // }

  if (!data) {
    return null;
  }

  const statistics = [
    { name: 'following', value: data.followingCount } as const,
    { name: 'followers', value: data.followersCount } as const,
    { name: 'publications', value: data.publicationsCount } as const,
  ] satisfies ProfileSummaryItem[];

  if (isLoadingPosts && isLoadingProfile && isLoadingUser) {
    return <div>Loading...</div>;
  }

  const avatar = data?.avatars[0]?.url;

  return (
    <>
      <HeadMeta title={'My Profile'} />

      <UserProfile
        aboutMe={data.aboutMe}
        avatarProps={{ url: avatar }}
        posts={postsResponse?.items}
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

MyProfile.getLayout = getPrivateLayout;

export default MyProfile;
