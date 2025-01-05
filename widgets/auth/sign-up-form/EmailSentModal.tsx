import React from 'react';

import { CloseDialog, DEPRECATED_Modal } from '@/features';
import { Button, Typography } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { Trans } from '@/widgets/Trans/Trans';
import { useRouter } from 'next/navigation';

type Props = {
  email: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const EmailSentModal = (props: Props) => {
  const { email, open, setOpen } = props;
  const router = useRouter();

  function handleModalClosed() {
    setOpen(false);
    router.push('sign-in');
  }

  return (
    <>
      <HeadMeta title={'Email Sent'} />
      <DEPRECATED_Modal
        onClose={handleModalClosed}
        open={open}
        showCloseButton
        title={'Email sent'}
      >
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
      </DEPRECATED_Modal>
    </>
  );
};
