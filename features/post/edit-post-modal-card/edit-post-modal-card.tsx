import { FC, useId } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { PhotoGallery } from '@/features';
import { EditPostForm, EditPostFormProps } from '@/features/post/edit-post-form/edit-post-form';
import { Button, IconButton, ModalCard, Typography, UserBanner } from '@/shared/ui';
import clsx from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './edit-post-modal-card.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

export type EditPostModalCardProps = {
  avatar?: StaticImport | string;
  editPostFormProps: Pick<
    EditPostFormProps,
    'description' | 'onSubmit' | 'onSubmitError' | 'textFieldProps' | 'textLimit'
  >;
  onClose?: () => void;
  submitButtonTitle?: string;
  title: string;
  userName: string;
};

export const EditPostModalCard: FC<EditPostModalCardProps> = ({
  avatar,
  editPostFormProps,
  onClose,
  submitButtonTitle = 'Save Changes',
  title,
  userName,
}) => {
  const formId = useId();

  const img = [
    'https://images.pexels.com/photos/27308308/pexels-photo-27308308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/27043375/pexels-photo-27043375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/27350492/pexels-photo-27350492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  return (
    <ModalCard.Root className={s.cardRoot}>
      <ModalCard.Header className={s.header}>
        <Typography.H1 className={modalCardS.headerTitle} component={'h2'}>
          {title}
        </Typography.H1>
        <IconButton className={modalCardS.headerIconButtonLast} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </ModalCard.Header>

      <div className={s.contentWrapper}>
        <PhotoGallery additionalClass={s.gallery} items={img.map(i => ({ original: i }))} />
        <ModalCard.Content className={clsx(s.content, modalCardS.contentScrollable)}>
          <UserBanner avatarProps={{ src: avatar }} userName={userName} />
          <EditPostForm id={formId} {...editPostFormProps} />
          <Button className={s.submitButton} form={formId}>
            {submitButtonTitle}
          </Button>
        </ModalCard.Content>
      </div>
    </ModalCard.Root>
  );
};
