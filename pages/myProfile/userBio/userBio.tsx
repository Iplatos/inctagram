import UserPhotoFallbackIcon from '@/assets/icons/account-photo.svg?url';
import { UserCounter } from '@/pages/myProfile/userCounter/userCounter';
import { Button } from '@/shared/ui';
import { Avatar } from '@/shared/ui/avatar';
import { Typography } from '@/shared/ui/typography';
import Image from 'next/image';

import s from './userBio.module.scss';

export const UserBio = () => {
  const profile = {
    familyName: 'inst',
    firstName: 'ana',
    followers: 2358,
    following: 2218,
    photos: [
      {
        authorId: '32asdf67-283b-16d7-a546-4266as4400fe',
        createdAt: '2023-10-26T12:55:21.448Z',
        cropProps: '{"pos":{"x":1,"y":0.5},"scale":1}',
        id: '32asdf67-283b-16d7-a546-4266as4400fe',
        title: 'vacations-2004.jpg',
        updatedAt: '2023-10-26T12:55:21.448Z',
        url: 'http://photo.com',
      },
    ],
    publication: 2764,
    status:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ' +
      'ut aliquip ex ea commodo consequat.',
    userName: 'Instagirl',
  };

  return (
    <div className={s.userBioRoot}>
      <div className={s.userBioAvatar}>
        <Avatar
          classes={{ avatarRoot: s.userBioAvatar }}
          fallback={
            <Image
              alt={'avatar fallback'}
              className={s.userBioAvatarFallback}
              src={UserPhotoFallbackIcon}
            />
          }
          src={profile.photos[0].url}
        />
      </div>
      <div className={s.userBioRootInfo}>
        <div className={s.userBioInfo}>
          <div className={s.userBioRow}>
            <div className={s.userBioName}>
              <Typography.H1 color={'var(--color-light-100)'}>{profile.userName}</Typography.H1>
            </div>

            <Button variant={'secondary'}>Profile Settings</Button>
          </div>
        </div>
        <div className={s.userBioRow}>
          <UserCounter className={'userBioCounter'} count={profile.following} text={'Following'} />
          <UserCounter className={'userBioCounter'} count={profile.followers} text={'Followers'} />
          <UserCounter count={profile.publication} text={'Publication'} />
        </div>
        <div className={s.userBioRow}>{profile.status}</div>
      </div>
    </div>
  );
};
