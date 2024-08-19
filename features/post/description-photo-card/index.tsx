import React from 'react';

import { ArrowLeft } from '@/assets/icons/arrow-left';
import { EditPostForm } from '@/features/post/edit-post-form/edit-post-form';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Card, IconButton, Typography } from '@/shared/ui';
import { UserBanner } from '@/shared/ui/user-banner';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './description-photo-card.module.scss';

type DescriptionPhotoCardProps = {
  avatar?: StaticImport | string;
  userName: string;
};

export const DescriptionPhotoCard = (props: DescriptionPhotoCardProps) => {
  const { avatar, userName } = props;
  const { t } = useTranslation();

  const labelCard = t.myProfile.addPostModal.postDescriptionCard.labelCard;
  const titleBtnSubmit =
    t.myProfile.addPostModal.postDescriptionCard.postDescription.titleBtnSubmit;

  const handleSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Card.Root className={s.root}>
      <Card.Header className={s.header}>
        <IconButton>
          <ArrowLeft />
        </IconButton>
        <Typography.H1>{labelCard}</Typography.H1>
        <div></div>
        {/* <Button variant="text">{titleBtnSubmit}</Button> */}
      </Card.Header>
      <Card.Content className={s.content}>
        <div className={s.slider}></div>
        <div className={s.description}>
          <UserBanner avatar={avatar} name={userName} />
          <EditPostForm
            classNameSubmit={s.submit}
            onSubmit={handleSubmit}
            titleSubmit={titleBtnSubmit}
          />
        </div>
      </Card.Content>
    </Card.Root>
  );
};
