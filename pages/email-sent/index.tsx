import React, { useState } from 'react';

import { CloseDialog, DEPRECATED_Modal } from '@/features/DEPRECATED_Modal';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/typography';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { Trans } from '@/widgets/Trans/Trans';
import { getPublicLayout } from '@/widgets/layouts';
import { useRouter } from 'next/navigation';

const EmailSent = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('someEmail');
  const router = useRouter();

  function handleModalClosed() {
    setOpen(false);
    router.push('sign-up');
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

EmailSent.getLayout = getPublicLayout;
export default EmailSent;
