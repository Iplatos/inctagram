import React from 'react';

import { ArrowIOSBack } from '@/assets/icons/arrow-ios-back';
import { Button, IconButton, ModalCard, Typography, UserBanner } from '@/shared/ui';

import s from './publication-card.module.scss';

import { PhotoGallery } from '../photo-gallery';
import { EditPostForm } from '../post';

export type PublicationCardProps = {
  items: any;
  onPrevClick?: () => void;
  onPublish?: () => void;
};

export const PublicationCard = (props: PublicationCardProps) => {
  const { items, onPrevClick, onPublish } = props;

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = () => {};

  // const [_, { data: meResponse }] = useLazyGetMeQuery();

  return (
    <ModalCard className={s.cardRoot}>
      <ModalCard.Header className={s.header}>
        <IconButton onClick={onPrevClick}>
          <ArrowIOSBack />
        </IconButton>
        <Typography.H1 className={s.headerTitle} component={'h2'}>
          Publication
        </Typography.H1>
        <Button onClick={onPublish} variant={'text'}>
          Publish
        </Button>
      </ModalCard.Header>

      <div className={s.contentWrapper}>
        <PhotoGallery items={items} />
        <ModalCard.Content>
          {/* <div className={s.form} style={{ background: 'green' }}> */}
          {/* <UserBanner avatar={meResponse?.data.avatar?.url} name={meResponse?.data.username} /> */}
          <UserBanner name={'Username'} />

          <EditPostForm classNameActions={s.actions} onSubmit={handleSubmit} ref={formRef} />
          {/* </div> */}
        </ModalCard.Content>
      </div>
    </ModalCard>
  );
};
