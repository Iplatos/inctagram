import React, { useEffect, useState } from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { Trans } from '@/components/Trans/Trans';
import { CloseDialog, Modal } from '@/features/modal';
import { Typography } from '@/shared/ui';
import { Button } from '@/shared/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useConfirmCodeMutation } from 'pages/api/auth.service';

function ConfirmRegistration() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const code = searchParams.get('code');
  const router = useRouter();
  const [confirmCode] = useConfirmCodeMutation();
  const [open, setOpen] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('someEmail');

  console.log(userId);
  useEffect(() => {
    if (code && userId) {
      confirmCode({ code, userId });
      router.push('/email-confirmed');
    }
  }, [code, userId]);

  function handleModalClosed() {
    setOpen(false);
  }

  return (
    <>
      <HeadMeta title={'Confirm Registration'} />

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
}

ConfirmRegistration.getLayout = getLayout;
export default ConfirmRegistration;

/*
import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { ForgotPasswordForm, RedirectContent } from '@/components/auth';

function ConfirmedEmailPage() {
  return (
    <>
      <HeadMeta title={'Email Confirmed'} />
      {/!* <RedirectContent linkExpired /> *!/}
      <RedirectContent emailConfirmed />
    </>
  );
}

ConfirmedEmailPage.getLayout = getLayout;
export default ConfirmedEmailPage;
*/
