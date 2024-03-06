import { UserBio } from '@/pages/myProfile/userBio/userBio';

import s from './profilePage.module.scss';

export const MyProfile = () => {
  return (
    <>
      <div className={s.userPageRoot}>
        <UserBio />
      </div>
    </>
  );
};
