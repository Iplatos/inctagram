import React from 'react';

import { ArrowIOSBack } from '@/assets/icons/arrow-ios-back';
import { Button, Card, IconButton, Typography } from '@/shared/ui';
import { UserBanner } from '@/shared/ui/user-banner';

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
    <Card className={s.cardRoot}>
      <Card.Header className={s.header}>
        <IconButton onClick={onPrevClick}>
          <ArrowIOSBack />
        </IconButton>
        <Typography.H1 className={s.headerTitle} component={'h2'}>
          Publication
        </Typography.H1>
        <Button onClick={onPublish} variant={'text'}>
          Publish
        </Button>
      </Card.Header>

      <div className={s.contentWrapper}>
        <PhotoGallery items={items} />
        <Card.Content className={s.filtersList}>
          <div className={s.form}>
            {/* <UserBanner avatar={meResponse?.data.avatar?.url} name={meResponse?.data.username} /> */}
            <UserBanner name={'Username'} />

            <EditPostForm classNameActions={s.actions} onSubmit={handleSubmit} ref={formRef} />
          </div>
        </Card.Content>
      </div>
    </Card>
  );
};
