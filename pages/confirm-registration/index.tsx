import { useEffect } from 'react';

import { useConfirmCodeMutation } from '@/shared/api/auth-api';
import { Button, Typography } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './confirm-registration.module.scss';

export const ConfirmRegistration = () => {
  const router = useRouter();
  const [confirmCode, { data: response }] = useConfirmCodeMutation();
  const { query } = router;

  useEffect(() => {
    if (query.code) {
      confirmCode({ code: query.code as string });
    }
  }, [confirmCode, query]);

  /**
   * render the desired UI depending on the `confirmCode` response.
   * - If all was successful, then show [this UI]{@link (https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=301-5874&mode=design&t=pZd1HNpBuoy77ApL-4)}
   * - If the confirmation code has expired, show [this UI]{@link (https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=301-6009&mode=design&t=pZd1HNpBuoy77ApL-4)}
   * - If the user tries to reuse the already confirmed code, then write something like "Invalid confirmation code. Please register for the confirmation code.  [/sign-up]{@link (../sign-up/index.tsx)}". __This UI is not in figma! You have to create it yourself__.
   */
  const success = response?.data;

  return (
    <>
      <HeadMeta title={'Confirm Registration'} />
      <div className={s.outerContainer}>
        <div className={s.innerContainer}>
          {success ? (
            <>
              <Typography.H1>Congratulations!</Typography.H1>
              <Typography.Regular16>Your email has been confirmed</Typography.Regular16>
              <Button as={'span'}>
                <Link href={'/sign-up'}>sign up</Link>
              </Button>
            </>
          ) : (
            <Typography.H1 style={{ textAlign: 'center' }}>
              `code` search param wasn&apos;t provided or expired.
            </Typography.H1>
          )}
        </div>
      </div>
    </>
  );
};

ConfirmRegistration.getLayout = getLayout;
export default ConfirmRegistration;
