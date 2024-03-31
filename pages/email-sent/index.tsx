import { useState } from 'react';

import { CloseDialog, Modal } from '@/features/modal';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/typography';
import { AuthLayout } from '@/widgets/AuthLayout/AuthLayout';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { Trans } from '@/widgets/Trans/Trans';

import { NextPageWithLayout } from '../_app';

const EmailSent: NextPageWithLayout = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('someEmail');

  function handleModalClosed() {
    setOpen(false);
  }

  return (
    <>
      <HeadMeta title={'Email Sent'} />

      <Modal onClose={handleModalClosed} open={open} showCloseButton title={'Email sent'}>
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
    </>
  );
};

EmailSent.getLayout = page => <AuthLayout>{page}</AuthLayout>;
export default EmailSent;
