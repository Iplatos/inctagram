import React, { useState } from 'react';

import { Trans } from '@/components/Trans/Trans';
import { CloseDialog, Modal } from '@/features';
import { Typography } from '@/shared/ui';
import { Button } from '@/shared/ui/Button';
import BookmarkOutline from 'assets/icons/bookmark-outline.svg';
import HomeOutline from 'assets/icons/home-outline.svg';
import LogOutOutline from 'assets/icons/log-out-outline.svg';
import MessageCircleOutline from 'assets/icons/message-circle-outline.svg';
import PersonOutline from 'assets/icons/person-outline.svg';
import PlusSquareOutline from 'assets/icons/plus-square-outline.svg';
import SearchOutline from 'assets/icons/searchOutline.svg';
import TrendingUpOutline from 'assets/icons/trending-up-outline.svg';

import s from './sidebar.module.scss';

export const SideBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('someEmail');

  function handleModalClosed() {
    setOpen(false);
  }

  function handleModalOpened() {
    setOpen(true);
  }

  return (
    <div className={s.sidebarContainer}>
      <div className={s.buttonContainer}>
        <button disabled>
          <HomeOutline className={s.svgAsComponent} />
          Home
        </button>

        <button>
          <PlusSquareOutline className={s.svgAsComponent} />
          Create
        </button>
        <button>
          <PersonOutline className={s.svgAsComponent} />
          My Profile
        </button>
        <button>
          <MessageCircleOutline className={s.svgAsComponent} />
          Messenger
        </button>
        <button>
          <SearchOutline className={s.svgAsComponent} />
          Search
        </button>
      </div>
      <div className={s.buttonContainer}>
        <button>
          <TrendingUpOutline className={s.svgAsComponent} />
          Statistics
        </button>
        <button>
          <BookmarkOutline className={s.svgAsComponent} />
          Favorites
        </button>
      </div>
      <div className={s.logOutButtonContainer}>
        <button onClick={handleModalOpened}>
          <LogOutOutline className={s.svgAsComponent} />
          Log Out
        </button>
        <Modal onClose={handleModalClosed} open={open} showCloseButton title={'title'}>
          <Typography.Regular16>
            <Trans
              tags={{
                '1': () => <b>{`${email}`}</b>,
              }}
              text={`Are you really want to log out of your account ${email}?`}
            />
          </Typography.Regular16>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}>
            <CloseDialog asChild>
              <Button variant={'primary'}>OK</Button>
            </CloseDialog>
          </div>
        </Modal>
      </div>
    </div>
  );
};
