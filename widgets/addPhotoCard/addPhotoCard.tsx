import { ChangeEvent, useRef } from 'react';

import { AvatarFallback } from '@/assets/icons/avatar-fallback';
import { CloseIcon } from '@/assets/icons/close';
import { CloseDialog, Modal } from '@/features';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Typography } from '@/shared/ui';
import { Content, Header, TemplateCard } from '@/shared/ui/TemplateCard/TemplateCard';
import { Alert } from '@/shared/ui/alert';
import * as Dialog from '@radix-ui/react-dialog';

import s from './addPhotoCard.module.scss';

import { Trans } from '../Trans/Trans';

type Props = {
  draft?: boolean;
  error: null | string;
  onClose?: () => void;
  open: boolean;
  setImg?: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
};

export const AddPhotoCard = (props: Props) => {
  const FileRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  return (
    <Dialog.Root onOpenChange={props.onClose} open={props.open}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.dialogContent}>
          {props.open && (
            <TemplateCard className={s.addPhotoCard}>
              <Header className={s.header}>
                <Typography.H1>{props.title}</Typography.H1>
                <CloseDialog className={s.closeButton}>
                  <CloseIcon className={s.closeIcon} />
                </CloseDialog>
              </Header>
              <div className={s.content}>
                <Content>
                  {props.error && (
                    <Alert classes={{ alertRoot: s.error }} severity={'error'}>
                      <Typography.Regular14>
                        <Trans
                          tags={{
                            bold: ({ content }) => <Typography.Bold14>{content}</Typography.Bold14>,
                          }}
                          text={props.error}
                        />
                      </Typography.Regular14>
                    </Alert>
                  )}
                  <div className={s.cardBody}>
                    <div className={s.placeholder}>
                      <AvatarFallback className={s.image} />
                    </div>

                    <div className={s.buttonsGroup}>
                      <label>
                        <Button as={'span'} className={s.button}>
                          {t.common.avatarUploader.buttons.select}
                        </Button>
                        <input
                          className={s.inputFile}
                          onChange={props.setImg}
                          ref={FileRef}
                          type={'file'}
                        />
                      </label>

                      {props.draft && (
                        <Button className={s.draft} variant={'tertiary'}>
                          {t.common.postsList.buttons.draftButton}
                        </Button>
                      )}
                    </div>
                  </div>
                </Content>
              </div>
            </TemplateCard>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
