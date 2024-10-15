import React, { ReactNode } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import {
  FriendPrivatePostCard,
  FriendPrivatePostCardProps,
  ProfilePrivatePostCard,
  ProfilePrivatePostCardProps,
  PublicPostCard,
  PublicPostCardProps,
} from '@/features/post/post-card';
import { IconButton, ModalRoot } from '@/shared/ui';

import s from './post-modal.module.scss';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
};

export const PostModal = (props: Props) => {
  const { children, isOpen, onClose } = props;

  return (
    <ModalRoot onOpenChange={onClose} open={isOpen}>
      <IconButton className={s.closeBtn} onClick={() => onClose(false)}>
        <CloseIcon />
      </IconButton>
      {children}
    </ModalRoot>
  );
};

export const PrivateProfilePostModal = (
  props: Omit<Props, 'children'> & FriendPrivatePostCardProps
) => {
  const { isOpen, onClose, ...rest } = props;

  return (
    <PostModal isOpen={isOpen} onClose={onClose}>
      <ProfilePrivatePostCard {...rest} />
    </PostModal>
  );
};

export const PrivateFriendPostModal = (
  props: Omit<Props, 'children'> & ProfilePrivatePostCardProps
) => {
  const { isOpen, onClose, ...rest } = props;

  return (
    <PostModal isOpen={isOpen} onClose={onClose}>
      <FriendPrivatePostCard {...rest} />
    </PostModal>
  );
};

export const PublicPostModal = (props: Omit<Props, 'children'> & PublicPostCardProps) => {
  const { isOpen, onClose, ...rest } = props;

  return (
    <PostModal isOpen={isOpen} onClose={onClose}>
      <PublicPostCard {...rest} />
    </PostModal>
  );
};
