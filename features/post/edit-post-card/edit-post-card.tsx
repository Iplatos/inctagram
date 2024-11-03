import { FC, useId } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { EditPostForm, EditPostFormProps } from '@/entities/post';
import { PhotoGallery } from '@/features/photo-gallery';
import { resolveImageSrcToString } from '@/shared/helpers';
import { useTranslation } from '@/shared/hooks';
import { Button, IconButton, ModalCard, Typography, UserBanner } from '@/shared/ui';
import clsx from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './edit-post-card.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

export type EditPostCardProps = {
  avatar?: StaticImport | string;

  editPostFormProps: Pick<
    EditPostFormProps,
    'description' | 'onSubmit' | 'onSubmitError' | 'textLimit'
  >;
  images: (StaticImport | string)[];
  onClose?: () => void;
  userName: string;
};

export const EditPostCard: FC<EditPostCardProps> = ({
  avatar,
  editPostFormProps,
  images,
  onClose,
  userName,
}) => {
  const t = useTranslation().t.post.editPostModalCard;
  const formId = useId();

  return (
    <ModalCard.Root className={s.cardRoot}>
      <ModalCard.Header className={s.header}>
        <Typography.H1 className={modalCardS.headerTitle} component={'h2'}>
          {t.labelCard}
        </Typography.H1>
        <IconButton className={modalCardS.headerIconButtonLast} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </ModalCard.Header>

      <div className={s.contentWrapper}>
        <PhotoGallery
          additionalClass={s.gallery}
          items={images.map(i => ({ original: resolveImageSrcToString(i) as string }))}
        />
        <ModalCard.Content className={clsx(s.content, modalCardS.contentScrollable)}>
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
      </div>
    </ModalCard.Root>
  );
};
