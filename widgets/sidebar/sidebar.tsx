import { useEffect, useState } from 'react';

import { ConfirmModal } from '@/features/confirm-modal';
import { useLogoutMutation, useRefreshTokenQuery } from '@/shared/api/auth-api';
import { useLazyGetMeQuery } from '@/shared/api/users-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
import BookmarkOutline from 'assets/icons/bookmark-outline.svg';
import HomeOutline from 'assets/icons/home-outline.svg';
import LogOutOutline from 'assets/icons/log-out-outline.svg';
import MessageCircleOutline from 'assets/icons/message-circle-outline.svg';
import PersonOutline from 'assets/icons/person-outline.svg';
import PlusSquareOutline from 'assets/icons/plus-square-outline.svg';
import SearchOutline from 'assets/icons/searchOutline.svg';
import TrendingUpOutline from 'assets/icons/trending-up-outline.svg';
import clsx from 'clsx';
import Link from 'next/link';

import s from './sidebar.module.scss';

import { Trans } from '../Trans/Trans';

export const Sidebar = () => {
  const t = useTranslation().t.common;
  const [open, setOpen] = useState(false);

  const [logoutTrigger, { isLoading: isLogOutLoading }] = useLogoutMutation();
  const { isSuccess: isAuthSuccess } = useRefreshTokenQuery();
  const [getMyProfile, { data: meResponse }] = useLazyGetMeQuery();

  useEffect(() => {
    if (isAuthSuccess) {
      getMyProfile(undefined, true);
    }
  }, [isAuthSuccess, getMyProfile]);

  const handleLogout = async () => {
    try {
      await logoutTrigger();
      setOpen(false);
    } catch (error) {
      console.error('Failed to delete avatar:', error);
    }
  };
  const closeModal = () => {
    if (!isLogOutLoading) {
      setOpen(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.buttonsGroup}>
        <Typography.Regular14 className={s.button} component={Link} href={'/'}>
          <HomeOutline className={s.svg} />
          Home
        </Typography.Regular14>

        <Typography.Regular14 className={s.button} tabIndex={1}>
          <PlusSquareOutline className={s.svg} />
          Create
        </Typography.Regular14>
        <Typography.Regular14 className={s.button} component={Link} href={'/my-profile'}>
          <PersonOutline className={s.svg} />
          My Profile
        </Typography.Regular14>
        <Typography.Regular14 className={s.button} tabIndex={1}>
          <MessageCircleOutline className={s.svg} />
          Messenger
        </Typography.Regular14>
        <Typography.Regular14 className={s.button} tabIndex={1}>
          <SearchOutline className={s.svg} />
          Search
        </Typography.Regular14>
      </div>

      <div className={s.buttonsGroup}>
        <Typography.Regular14 className={s.button} tabIndex={1}>
          <TrendingUpOutline className={s.svg} />
          Statistics
        </Typography.Regular14>
        <Typography.Regular14 className={s.button} tabIndex={1}>
          <BookmarkOutline className={s.svg} />
          Favorites
        </Typography.Regular14>
      </div>

      <Typography.Regular14
        className={clsx(s.button, s.buttonLogout)}
        onClick={() => setOpen(true)}
        tabIndex={1}
      >
        <LogOutOutline className={s.svg} />
        Log Out
      </Typography.Regular14>

      <ConfirmModal
        cancelButtonTitle={t.modal.buttonNames.cancel}
        confirmButtonTitle={t.modal.buttonNames.confirm}
        headerTitle={t.logOutModal.title}
        onCancel={closeModal}
        onConfirm={handleLogout}
        open={open}
      >
        <Typography.Regular14>
          <Trans
            tags={{
              email: () => <Typography.Bold16>{meResponse?.data.email}</Typography.Bold16>,
            }}
            text={t.logOutModal.description}
          />
        </Typography.Regular14>
      </ConfirmModal>
    </div>
  );
};
