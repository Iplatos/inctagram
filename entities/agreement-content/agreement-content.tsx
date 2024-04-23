import React from 'react';

import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
import Image from 'next/image';
import Link from 'next/link';

import style from './agreement-content.module.scss';

import ArrowImg from '../../assets/icons/arrow-back.svg?url';

export type AgreementType = {
  privacyPolicy?: boolean;
  termsOfService?: boolean;
};

export const AgreementContent = (props: AgreementType) => {
  const { privacyPolicy, termsOfService } = props;

  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <Link href={'./signUp'}>
        <div className={style.buttonBlock}>
          <Image alt={'back'} src={ArrowImg} />
          <Typography.Regular14>
            {privacyPolicy
              ? `${t.auth.privacyPolicy.backSignUp}`
              : `${t.auth.termsOfService.backSignUp}`}
          </Typography.Regular14>
        </div>
      </Link>

      <div className={style.content}>
        <Typography.H1>
          {privacyPolicy ? `${t.auth.privacyPolicy.title}` : `${t.auth.termsOfService.title}`}
        </Typography.H1>
        <div className={style.contentText}>
          <Typography.Regular14>
            {privacyPolicy ? `${t.auth.privacyPolicy.content}` : `${t.auth.privacyPolicy.content}`}
          </Typography.Regular14>
        </div>
      </div>
    </div>
  );
};
