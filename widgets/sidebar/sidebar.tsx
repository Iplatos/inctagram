import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { CloseDialog, Modal } from '@/features/modal';
import { useGetMeQuery, useLogoutMutation } from '@/shared/api/auth.service';
import { baseApi, setTokenToLocalStorage } from '@/shared/api/base-api';
import { useAppSelector } from '@/shared/api/store';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/typography';
import { Trans } from '@/widgets/Trans/Trans';
import BookmarkOutline from 'assets/icons/bookmark-outline.svg';
import HomeOutline from 'assets/icons/home-outline.svg';
import LogOutOutline from 'assets/icons/log-out-outline.svg';
import MessageCircleOutline from 'assets/icons/message-circle-outline.svg';
import PersonOutline from 'assets/icons/person-outline.svg';
import PlusSquareOutline from 'assets/icons/plus-square-outline.svg';
import SearchOutline from 'assets/icons/searchOutline.svg';
import TrendingUpOutline from 'assets/icons/trending-up-outline.svg';
import { useRouter } from 'next/navigation';

import s from './sidebar.module.scss';

export const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [logout] = useLogoutMutation();
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const { email } = useGetMeQuery(undefined, {
    selectFromResult: res => ({ email: res.data?.email ?? '' }),
  });
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  function handleModalClosed() {
    setOpen(false);
  }

  function handleModalOpened() {
    setOpen(true);
  }

  const logOut = () => {
    logout();
    setTokenToLocalStorage(null);
    dispatch(baseApi.util.resetApiState());
    router.push('/signIn');
  };

  return (
    <div className={s.sidebarContainer}>
      <div className={s.buttonContainer}>
        <div className={s.button} tabIndex={1}>
          <HomeOutline className={s.svgAsComponent} />
          Home
        </div>

        <div className={s.button} tabIndex={1}>
          <PlusSquareOutline className={s.svgAsComponent} />
          Create
        </div>
        <div className={s.button} tabIndex={1}>
          <PersonOutline className={s.svgAsComponent} />
          My Profile
        </div>
        <div className={s.button} tabIndex={1}>
          <MessageCircleOutline className={s.svgAsComponent} />
          Messenger
        </div>
        <div className={s.button} tabIndex={1}>
          <SearchOutline className={s.svgAsComponent} />
          Search
        </div>
      </div>

      <div className={s.buttonContainer}>
        <div className={s.button} tabIndex={1}>
          <TrendingUpOutline className={s.svgAsComponent} />
          Statistics
        </div>
        <div className={s.button} tabIndex={1}>
          <BookmarkOutline className={s.svgAsComponent} />
          Favorites
        </div>
      </div>

      <div className={s.buttonContainer}>
        <div className={s.button} onClick={handleModalOpened} tabIndex={1}>
          <LogOutOutline className={s.svgAsComponent} />
          Log Out
        </div>
        <Modal onClose={handleModalClosed} open={open} showCloseButton title={'Log Out'}>
          <Typography.Regular16>
            <Trans
              tags={{
                email: () => <Typography.Bold16>&quot;{email} &quot;</Typography.Bold16>,
              }}
              text={t.logOut.reallyWantToLogOut}
            />
          </Typography.Regular16>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}>
            <CloseDialog asChild>
              <div style={{ display: 'flex', justifyContent: 'space-Between', width: '216px' }}>
                <Button onClick={logOut} style={{ width: '96px' }} variant={'tertiary'}>
                  yes
                </Button>
                <Button style={{ width: '96px' }}>no</Button>
              </div>
            </CloseDialog>
          </div>
        </Modal>
      </div>
    </div>
  );
};
