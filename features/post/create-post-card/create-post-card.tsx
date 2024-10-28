import { useId } from 'react';

import { ArrowIOSBack } from '@/assets/icons/arrow-ios-back';
import { PhotoGallery } from '@/features/photo-gallery';
import { EditPostForm, EditPostFormProps } from '@/features/post/edit-post-form';
import { CreatePostModalItem } from '@/shared/api/modal-slice';
import { Button, IconButton, ModalCard, Typography, UserBanner } from '@/shared/ui';
import clsx from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './create-post-card.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

type Props = {
  avatar?: StaticImport | string;
  description?: string;
  editPostFormProps?: Pick<EditPostFormProps, 'textFieldProps'>;
  items: CreatePostModalItem[];
  onBlur?: (data: { description: string }) => void;
  onPrevClick?: () => void;
  onPublishPost?: () => void;
  publishButtonLabel?: string;
  textLimit?: number;
  title: string;
  userName: string;
};

// TODO: add `disabled` styles and behavior
export const CreatePostCard = ({
  avatar,
  description,
  editPostFormProps,
  items,
  onBlur,
  onPrevClick,
  onPublishPost,
  publishButtonLabel = 'Publish',
  textLimit,
  title,
  userName,
}: Props) => {
  const formId = useId();

  return (
    <ModalCard className={s.cardRoot}>
      <ModalCard.Header className={s.header}>
        <IconButton className={modalCardS.headerIconButtonFirst} onClick={onPrevClick}>
          <ArrowIOSBack />
        </IconButton>
        <Typography.H1 className={s.headerTitle} component={'h2'}>
          {title}
        </Typography.H1>
        <Button
          className={clsx(modalCardS.headerIconButtonLast, s.publishButton)}
          form={formId}
          variant={'text'}
        >
          {publishButtonLabel}
        </Button>
      </ModalCard.Header>

      <div className={s.contentWrapper}>
        <PhotoGallery
          additionalClass={s.gallery}
          items={items.map(i => ({
            original: i.src,
          }))}
        />
        <ModalCard.Content className={clsx(s.content, modalCardS.contentScrollable)}>
          <UserBanner avatar={avatar} className={s.userBanner} name={userName} />
          <EditPostForm
            description={description}
            id={formId}
            onBlur={onBlur}
            onSubmit={() => onPublishPost?.()}
            textLimit={textLimit}
            {...editPostFormProps}
          />
        </ModalCard.Content>
      </div>
    </ModalCard>
  );
};
