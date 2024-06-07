import React, { useState } from 'react';

import { CloseDialog, Modal } from '@/features';
import { Button, Typography } from '@/shared/ui';
import { Trans } from '@/widgets/Trans/Trans';

type EmailSentModalProps = {
  email?: string;
  isOpen: boolean;
  setOpen: (x: boolean) => void;
};

export const EmailSentModal = ({ email, isOpen, setOpen }: EmailSentModalProps) => {
  function handleModalClosed() {
    setOpen(false);
  }

  return (
    <Modal onClose={handleModalClosed} open={isOpen} showCloseButton title={'Email sent'}>
      <Typography.Regular16>
        <Trans
          tags={{
            '1': () => <b>{`${email}`}</b>,
          }}
          text={`We have sent a link to confirm your email to "${email}?"`}
        />
      </Typography.Regular16>
      <div style={{ display: 'flex', justifyContent: 'right', marginTop: 25 }}>
        <CloseDialog asChild>
          <div style={{ display: 'flex' }}>
            <Button style={{ width: '96px' }}>Yes</Button>
          </div>
        </CloseDialog>
      </div>
    </Modal>
  );
};
