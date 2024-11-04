import { FC, useId } from 'react';

import { ArrowIOSBack } from '@/assets/icons/arrow-ios-back';
import { CloseIcon } from '@/assets/icons/close';
import { EditPostForm, EditPostFormProps } from '@/entities/post/edit-post-form';
import { useTranslation } from '@/shared/hooks';
import { Button, IconButton, ModalCard, Typography, UserBanner } from '@/shared/ui';
import clsx from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './edit-content.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

export type MyProfilePostCardEditContentProps = {
  avatar?: StaticImport | string;
  editPostFormProps: Pick<
    EditPostFormProps,
    'description' | 'onBlur' | 'onFocus' | 'onSubmit' | 'onSubmitError' | 'textLimit'
  >;
  onClose?: () => void;
  onPrevClick?: () => void;
  userName: string;
};

export const MyProfilePostCardEditContent: FC<MyProfilePostCardEditContentProps> = ({
  avatar,
  editPostFormProps,
  onClose,
  onPrevClick,
  userName,
}) => {
  const formId = useId();
  const t = useTranslation().t.post.editPostModalCard;

  return (
    <>
      <ModalCard.Header className={s.header}>
        <IconButton className={modalCardS.headerIconButtonFirst} onClick={onPrevClick}>
          <ArrowIOSBack />
        </IconButton>
        <Typography.H1 className={s.headerTitle} component={'h2'}>
          {t.labelCard}
        </Typography.H1>
        <IconButton className={modalCardS.headerIconButtonLast} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </ModalCard.Header>

      <ModalCard.Content className={clsx(modalCardS.contentScrollable, s.content)}>
        <UserBanner avatarProps={{ src: avatar }} userName={userName} />
        <EditPostForm
          id={formId}
          textFieldProps={{
            error: t.postDescription.errors.tooBig,
            label: t.postDescription.label,
            placeholder: t.postDescription.placeholder,
          }}
          {...editPostFormProps}
        />
        <Button className={s.submitButton} form={formId}>
          {t.postDescription.titleBtnSubmit}
        </Button>
      </ModalCard.Content>
    </>
  );
};
