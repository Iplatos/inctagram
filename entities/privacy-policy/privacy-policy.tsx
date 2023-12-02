import React from 'react';

import { Typography } from '@/shared/ui';
import Image from 'next/image';

import style from './privacy-policy.module.scss';

import ArrowImg from '../../assets/icons/arrow-back.svg?url';

export const PrivacyPolicyContent = () => {
  return (
    <div className={style.container}>
      <div className={style.buttonBlock}>
        <Image alt={'back'} src={ArrowImg} />
        <Typography.Regular14>Back to Sign Up</Typography.Regular14>
      </div>

      <div className={style.content}>
        <Typography.H1>Privacy Policy</Typography.H1>
      </div>
    </div>
  );
};
