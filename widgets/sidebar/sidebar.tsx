import { ReactNode, useEffect, useState } from 'react';

import { ConfirmModal } from '@/features/confirm-modal';
import { useLogoutMutation, useRefreshTokenQuery } from '@/shared/api/auth-api';
import { useLazyGetMeQuery } from '@/shared/api/users-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
import { UiSidebar } from '@/shared/ui/sidebar';
import BookmarkOutline from 'assets/icons/bookmark-outline.svg';
import HomeOutline from 'assets/icons/home-outline.svg';
import LogOutOutline from 'assets/icons/log-out-outline.svg';
import MessageCircleOutline from 'assets/icons/message-circle-outline.svg';
import PersonOutline from 'assets/icons/person-outline.svg';
import PlusSquareOutline from 'assets/icons/plus-square-outline.svg';
import SearchOutline from 'assets/icons/searchOutline.svg';
import TrendingUpOutline from 'assets/icons/trending-up-outline.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Trans } from '../Trans/Trans';

export const Sidebar = () => {
  const t = useTranslation().t.common;
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

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

  type SidebarSectionsData = {
    [key: string]: {
      disabled?: boolean;
      href: string;
      icon: ReactNode;
      name: string;
    }[];
  };

  const SECTIONS: SidebarSectionsData = {
    section_01: [
      { href: '/', icon: <HomeOutline />, name: 'Home' },
      { disabled: true, href: '/create', icon: <PlusSquareOutline />, name: 'Create' },
      { href: '/my-profile', icon: <PersonOutline />, name: 'My Profile' },
      { disabled: true, href: '/messenger', icon: <MessageCircleOutline />, name: 'Messenger' },
      { disabled: true, href: '/search', icon: <SearchOutline />, name: 'Search' },
    ],
    section_02: [
      { disabled: true, href: '/statistics', icon: <TrendingUpOutline />, name: 'Statistics' },
      { disabled: true, href: '/favorits', icon: <BookmarkOutline />, name: 'Favorites' },
    ],
  };

  return (
    <UiSidebar.Root>
      {Object.entries(SECTIONS).map(([sectionKey, pages]) => (
        <UiSidebar.Section key={sectionKey}>
          {pages.map((page, index) => (
            <UiSidebar.Item
              component={Link}
              disabled={page?.disabled}
              href={page.href}
              icon={page.icon}
              isActive={pathname === page.href}
              key={index}
              title={page.name}
            />
          ))}
        </UiSidebar.Section>
      ))}
      <UiSidebar.Footer>
        <UiSidebar.Item icon={<LogOutOutline />} onClick={() => setOpen(true)} title={'Log out'} />
      </UiSidebar.Footer>

      <ConfirmModal
        cancelButtonTitle={t.modal.buttonNames.cancel}
        confirmButtonTitle={t.modal.buttonNames.confirm}
        disabled={isLogOutLoading}
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
    </UiSidebar.Root>
  );
};
