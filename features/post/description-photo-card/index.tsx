import React from 'react';

import { ArrowLeft } from '@/assets/icons/arrow-left';
import { EditPostForm, EditPostFormValues } from '@/features/post/edit-post-form/edit-post-form';
import { Button, Card, IconButton, Typography } from '@/shared/ui';
import { UserBanner } from '@/shared/ui/user-banner';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './description-photo-card.module.scss';

type DescriptionPhotoCardProps = {
  avatar?: StaticImport | string;
  userName: string;
};

export const DescriptionPhotoCard = (props: DescriptionPhotoCardProps) => {
  const { avatar, userName } = props;

  return (
    <Card.Root className={s.root}>
      <Card.Header className={s.header}>
        <IconButton>
          <ArrowLeft />
        </IconButton>
        <Typography.H1>Publication</Typography.H1>
        <div></div>
        {/*<Button variant={'text'}>Publish</Button>*/}
      </Card.Header>
      <Card.Content className={s.content}>
        <div className={s.slider}></div>
        <div className={s.description}>
          <UserBanner avatar={avatar} name={userName} />
          <EditPostForm
            onSubmit={(data: EditPostFormValues) => console.log(data)}
            titleSubmit={'Publish'}
            classNameSubmit={s.submit}
          />
        </div>
      </Card.Content>
    </Card.Root>
  );
};
