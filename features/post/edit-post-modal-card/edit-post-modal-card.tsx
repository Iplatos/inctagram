import React, { useState } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { PhotoGallery } from '@/features';
import { ConfirmModal } from '@/features/confirm-modal';
import { EditPostForm } from '@/features/post/edit-post-form/edit-post-form';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Card, IconButton, Modal, Typography, UserBanner } from '@/shared/ui';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './edit-post-modal-card.module.scss';

type Props = {
  avatar?: StaticImport | string;
  open: boolean;
  setOpen: (open: boolean) => void;
  userName: string;
};

export const EditPostModalCard = (props: Props) => {
  const { avatar, open, setOpen, userName } = props;
  const { t } = useTranslation();
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const {
    descriptionCloseModal,
    labelCard,
    postDescription: { titleBtnSubmit },
  } = t.post.editPostModalCard;

  const labelCloseModal = 'Close Post';
  const formRef = React.useRef<HTMLFormElement>(null);

  const onCloseEditPostModalCard = () => setOpen(false);
  const onOpenConfirmModal = () => setOpenConfirmModal(true);
  const onCloseConfirmModal = () => setOpenConfirmModal(false);

  const handleSubmit = (data: FormData) => {
    setOpen(false);
    console.log(data);
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
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
          <Typography.H1 component={'h2'}>{labelCard}</Typography.H1>
          <ConfirmModal
            headerTitle={labelCloseModal}
            onCancel={onCloseConfirmModal}
            onConfirm={onCloseEditPostModalCard}
            // open={openConfirmModal}
            trigger={
              <IconButton onClick={onOpenConfirmModal}>
                <CloseIcon />
              </IconButton>
            }
          >
            <Typography.Regular16 className={s.confirmModal}>
              {descriptionCloseModal}
            </Typography.Regular16>
          </ConfirmModal>
        </Card.Header>
        <Card.Content className={s.content} ignoreHeader>
          <PhotoGallery additionalClass={s.gallery} items={img.map(i => ({ original: i }))} />
          <div className={s.form}>
            <UserBanner avatar={avatar} name={userName} />
            <EditPostForm
              actions={
                <Button className={s.submitBtn} onClick={handleButtonClick}>
                  {titleBtnSubmit}
                </Button>
              }
              classNameActions={s.actions}
              onSubmit={handleSubmit}
              ref={formRef}
            />
          </div>
        </Card.Content>
      </Card.Root>
    </Modal.Root>
  );
};
