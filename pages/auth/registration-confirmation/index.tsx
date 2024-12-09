import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

import { useConfirmCodeMutation, useResendConfirmCodeMutation } from '@/shared/api/auth-api';
import { Button, Typography } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getPublicLayout } from '@/widgets/layouts';
import { useRouter } from 'next/router';

import s from './confirm-registration.module.scss';

export const ConfirmRegistration = () => {
  const [code, setCode] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const router = useRouter();

  const [setConfirmCode, { error, isError, isLoading, isSuccess }] = useConfirmCodeMutation();
  const [resentConfirmCode] = useResendConfirmCodeMutation();

  console.log({ error, isError, isLoading, isSuccess });

  const onSignIn = () => router.push('/sign-in');

  const resentConfirmCodeHandler = () => {
    if (email) {
      resentConfirmCode({ baseUrl: process.env.NEXT_PUBLIC_URL, email: email });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);

      setCode(params.get('code'));
      setEmail(params.get('email'));
    }
  }, []);

  useEffect(() => {
    if (code) {
      setConfirmCode({ confirmationCode: code });
    }
  }, [code, setConfirmCode]);

  return (
    <>
      <HeadMeta title={'Confirm Registration'} />
      <div className={s.outerContainer}>
        {isLoading && !isSuccess ? (
          <HashLoader size={150} />
        ) : (
          <div className={s.innerContainer}>
            {isError ? (
              <>
                <Typography.H1>Email verification link expired</Typography.H1>
                <Typography.Regular16>
                  Looks like the verification link has expired. Not to worry, we can send the link
                  again
                </Typography.Regular16>
                <Button component={'span'} onClick={resentConfirmCodeHandler}>
                  Resend verification link
                </Button>
              </>
            ) : (
              <>
                <Typography.H1>Congratulations!</Typography.H1>
                <Typography.Regular16>Your email has been confirmed</Typography.Regular16>
                <Button component={'span'} onClick={onSignIn}>
                  Sign In
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

ConfirmRegistration.getLayout = getPublicLayout;
export default ConfirmRegistration;
