import { FC, PropsWithChildren } from 'react';

import { ModalCard } from '@/shared/ui';
import { Alert } from '@/shared/ui/alert';
import clsx from 'clsx';

import s from './add-photo-card.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

export type AddPhotoCardContentProps = PropsWithChildren<{
  error: null | string;
}>;

export const AddPhotoCardContent: FC<AddPhotoCardContentProps> = ({ children, error }) => {
  return (
    <ModalCard.Content className={clsx(s.content, modalCardS.contentScrollable)}>
      {error && (
        <Alert classes={{ alertRoot: s.error }} severity={'error'}>
          {error}
        </Alert>
      )}
      {children}
    </ModalCard.Content>
  );
};
