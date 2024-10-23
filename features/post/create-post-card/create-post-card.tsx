import React from 'react';
import { useSelector } from 'react-redux';

import { ArrowIOSBack } from '@/assets/icons/arrow-ios-back';
import { PhotoGallery } from '@/features';
import { EditPostForm } from '@/features/post/edit-post-form/edit-post-form';
import {
  CreatePostModalItem,
  selectCreatePostModalDescription,
  setDescription,
} from '@/shared/api/modal-slice';
import { useAppDispatch } from '@/shared/api/pretyped-redux-hooks';
import { useTranslation } from '@/shared/hooks/useTranslation';
import {
  Button,
  IconButton,
  ModalCard,
  ModalCardContent,
  ModalCardHeader,
  Typography,
  UserBanner,
} from '@/shared/ui';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './create-post-card.module.scss';

type Props = {
  avatar?: StaticImport | string;
  confirmPublication: () => void;
  items: CreatePostModalItem[];
  onPrevClick: () => void;
  setOpen: (open: boolean) => void;
  userName: string;
};

export const CreatePostCard = (props: Props) => {
  const { avatar, confirmPublication, items, onPrevClick, setOpen, userName } = props;
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const description = useSelector(selectCreatePostModalDescription);

  const {
    labelCard,
    postDescription: { titleBtnSubmit },
  } = t.post.createPostCard;

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (data: { description: string }) => {
    setOpen(false);
    confirmPublication();
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const onBlurHandler = (data: { description: string }) => {
    if (data.description) {
      dispatch(setDescription(data.description));
    }
  };

  return (
    <ModalCard className={s.root}>
      <ModalCardHeader className={s.header}>
        <IconButton onClick={onPrevClick}>
          <ArrowIOSBack />
        </IconButton>
        <Typography.H1 component={'h2'}>{labelCard}</Typography.H1>
        <Button className={s.submitBtn} onClick={handleButtonClick} variant={'text'}>
          {titleBtnSubmit}
        </Button>
      </ModalCardHeader>
      <ModalCardContent className={s.content} ignoreHeader>
        <PhotoGallery
          additionalClass={s.gallery}
          items={items.map(i => ({
            original: i.src,
          }))}
        />
        <div className={s.form}>
          <UserBanner avatar={avatar} name={userName} />
          <EditPostForm
            classNameActions={s.actions}
            description={description}
            onBlur={onBlurHandler}
            onSubmit={handleSubmit}
            ref={formRef}
          />
        </div>
      </ModalCardContent>
    </ModalCard>
  );
};
