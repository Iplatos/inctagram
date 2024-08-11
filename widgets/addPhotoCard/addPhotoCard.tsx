import { ChangeEvent, FC } from 'react';

import { AvatarFallback } from '@/assets/icons/avatar-fallback';
import { CloseIcon } from '@/assets/icons/close';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Typography, Card } from '@/shared/ui';
import { Alert } from '@/shared/ui/alert';
import { Trans } from '@/widgets/Trans/Trans';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';

import s from './addPhotoCard.module.scss';

export type AddPhotoCardProps = {
  disabled?: boolean;
  draft?: boolean;
  error: null | string;
  // TODO: add an imperative api for clicking on the button with access to the input ref
  // TODO: add click handler for the "Draft" button
  onClose?: () => void;
  setImg?: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
};

export const AddPhotoCard: FC<AddPhotoCardProps> = ({
  disabled,
  draft,
  error,
  onClose,
  setImg,
  title,
}) => {
  const { t } = useTranslation();

  return (
    <Card className={s.root}>
      <Card.Header>
        <Typography.H1 className={s.title}>{title}</Typography.H1>
        <Dialog.Close
          className={clsx(s.closeButton, disabled && s.closeButtonDisabled)}
          disabled={disabled}
          onClick={onClose}
        >
          <CloseIcon />
        </Dialog.Close>
      </Card.Header>

      <Card.Content className={s.content}>
        {error && (
          <Alert classes={{ alertRoot: s.error }} severity={'error'}>
            <Typography.Regular14>
              <Trans
                tags={{
                  bold: ({ content }) => <Typography.Bold14>{content}</Typography.Bold14>,
                }}
                text={error}
              />
            </Typography.Regular14>
          </Alert>
        )}

        <div className={s.placeholderWrapper}>
          <div className={s.placeholderBackground}>
            <AvatarFallback className={s.placeholderIcon} />
          </div>
        </div>

        <div className={s.buttonsGroup}>
          <Button as={'label'} className={s.button}>
            {t.common.avatarUploader.buttons.select}
            <input onChange={setImg} style={{ display: 'none' }} type={'file'} />
          </Button>

          {draft && (
            <Button className={s.draft} variant={'tertiary'}>
              {t.common.postsList.buttons.draftButton}
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};
