import React from 'react';

import { ArrowLeft } from '@/assets/icons/arrow-left';
import { CloseIcon } from '@/assets/icons/close';
import { PhotoGallery } from '@/features';
import { EditPostForm } from '@/features/post/edit-post-form/edit-post-form';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Card, IconButton, Modal, Typography } from '@/shared/ui';
import { UserBanner } from '@/shared/ui/user-banner';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './description-photo-card.module.scss';

type Props = {
  avatar?: StaticImport | string;
  open: boolean;
  setOpen: (open: boolean) => void;
  userName: string;
};

export const DescriptionPhotoCard = (props: Props) => {
  const { avatar, open, setOpen, userName } = props;
  const { t } = useTranslation();

  const labelCard = t.myProfile.addPostModal.postDescriptionCard.labelCard;
  const titleBtnSubmit =
    t.myProfile.addPostModal.postDescriptionCard.postDescription.titleBtnSubmit;

  const handleSubmit = (data: FormData) => {
    setOpen(false);
    console.log(data);
  };

  const img = [
    'https://images.pexels.com/photos/27308308/pexels-photo-27308308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/27043375/pexels-photo-27043375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/27350492/pexels-photo-27350492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  return (
    <Modal.Root onOpenChange={setOpen} open={open}>
      <Card.Root className={s.root}>
        <Card.Header className={s.header}>
          <IconButton onClick={() => setOpen(false)}>
            <ArrowLeft />
          </IconButton>
          <Typography.H1 component={'h2'}>{labelCard}</Typography.H1>
          <div></div>
        </Card.Header>
        <Card.Content className={s.content}>
          <div className={s.slider}>
            <PhotoGallery items={img.map(i => ({ original: i }))} />
          </div>
          <div className={s.form}>
            <UserBanner avatar={avatar} name={userName} />
            <EditPostForm
              classNameSubmit={s.submit}
              onSubmit={handleSubmit}
              titleSubmit={titleBtnSubmit}
            />
          </div>
        </Card.Content>
      </Card.Root>
    </Modal.Root>
  );
};
