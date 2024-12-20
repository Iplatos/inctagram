import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import BookmarkOutline from '@/assets/icons/bookmark-outline.svg';
import HomeOutline from '@/assets/icons/home-outline.svg';
import LogOutOutline from '@/assets/icons/log-out-outline.svg';
import MessageCircleOutline from '@/assets/icons/message-circle-outline.svg';
import PersonOutline from '@/assets/icons/person-outline.svg';
import PlusSquareOutline from '@/assets/icons/plus-square-outline.svg';
import SearchOutline from '@/assets/icons/searchOutline.svg';
import TrendingUpOutline from '@/assets/icons/trending-up-outline.svg';
import { ConfirmModal } from '@/features/confirm-modal';
import { useLogoutMutation, useRefreshTokenQuery } from '@/shared/api/auth-api';
import { openModal } from '@/shared/api/modal-slice';
import { useLazyGetMeQuery } from '@/shared/api/users-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
import clsx from 'clsx';
import Link from 'next/link';

import s from './sidebar.module.scss';

import { Trans } from '../../../Trans/Trans';

export const Sidebar = () => {
  const { logOutModal, modal } = useTranslation().t.common;
  const { create, favorites, home, logOut, messenger, myProfile, search, statistic } =
    useTranslation().t.sidebar;

  const dispatch = useDispatch();

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
          {home}
        </Typography.Regular14>

        <Typography.Regular14
          className={s.button}
          onClick={() => dispatch(openModal())}
          tabIndex={1}
        >
          <PlusSquareOutline className={s.svg} />
          {create}
        </Typography.Regular14>
        <Typography.Regular14 className={s.button} component={Link} href={'/my-profile'}>
          <PersonOutline className={s.svg} />
          {myProfile}
        </Typography.Regular14>
        <Typography.Regular14 className={s.button} tabIndex={1}>
          <MessageCircleOutline className={s.svg} />
          {messenger}
        </Typography.Regular14>
        <Typography.Regular14 className={s.button} tabIndex={1}>
          <SearchOutline className={s.svg} />
          {search}
        </Typography.Regular14>
      </div>

      <div className={s.buttonsGroup}>
        <Typography.Regular14 className={s.button} tabIndex={1}>
          <TrendingUpOutline className={s.svg} />
          {statistic}
        </Typography.Regular14>
        <Typography.Regular14 className={s.button} tabIndex={1}>
          <BookmarkOutline className={s.svg} />
          {favorites}
        </Typography.Regular14>
      </div>

      <Typography.Regular14
        className={clsx(s.button, s.buttonLogout)}
        onClick={() => setOpen(true)}
        tabIndex={1}
      >
        <LogOutOutline className={s.svg} />
        {logOut}
      </Typography.Regular14>

      <ConfirmModal
        cancelButtonTitle={modal.buttonNames.cancel}
        confirmButtonTitle={modal.buttonNames.confirm}
        disabled={isLogOutLoading}
        headerTitle={logOutModal.title}
        onCancel={closeModal}
        onConfirm={handleLogout}
        open={open}
      >
        <Typography.Regular14>
          <Trans
            tags={{
              email: () => <Typography.Bold16>{meResponse?.email}</Typography.Bold16>,
            }}
            text={logOutModal.description}
          />
        </Typography.Regular14>
      </ConfirmModal>
    </div>
  );
};
