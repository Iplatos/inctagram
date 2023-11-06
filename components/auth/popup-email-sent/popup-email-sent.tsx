import React from 'react';

import { Button } from '@/shared/ui/Button/button';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';

import style from './popup-email-sent.module.scss';

import close from '../../../assets/icons/close.svg';
import { Card } from '@/shared/ui/Card/Card';
import { Typography } from '@/shared/ui';

export const PopupEmailSent = () => {
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className={style.button}>Edit profile</button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className={style.dialogOverlay} />

          <Dialog.Content className={style.dialogContent}>
            <div>
              <Typography.H1 className={style.dialogTitle}>Email sent</Typography.H1>
            </div>
            <div></div>

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

            <Dialog.Close asChild>
              <button aria-label={'Close'} className={style.closeButton}>
                <Image alt={'closeModal'} src={close} />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
