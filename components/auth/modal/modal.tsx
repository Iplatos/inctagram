import React, { ReactNode } from 'react';

import { Typography } from '@/shared/ui';
import { Button } from '@/shared/ui/Button/button';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';

import style from './modal.module.scss';

import CloseUrl from '../../../assets/icons/close.svg?url';

export default function Modal({
  children,
  onOpenChange,
  open,
}: {
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}) {
  return (
    <>
      <Dialog.Root onOpenChange={onOpenChange} open={open}>
        {children}
      </Dialog.Root>
    </>
  );
}

function ModalContent({ title }: { title: string }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={style.dialogOverlay} />
      <Dialog.Content className={style.dialogContent}>
        <div className={style.titleBlock}>
          <Typography.H1 className={style.dialogTitle}>{title}</Typography.H1>

          <Dialog.Close asChild>
            <button aria-label={'Close'} className={style.closeButton}>
              <Image alt={'closeModal'} src={CloseUrl} />
            </button>
          </Dialog.Close>
        </div>

        <div className={style.contentBlock}>
          <Typography.Regular16 className={style.dialogDescription}>
            We have sent a link to confirm your email to epam com
          </Typography.Regular16>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}>
            <Dialog.Close asChild>
              <Button className={style.button} variant={'primary'}>
                OK
              </Button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

Modal.Button = Dialog.Trigger;
Modal.Content = ModalContent;
