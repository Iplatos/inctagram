import { BellIcon } from '@/assets/icons/bell';
import { Header } from '@/shared/layouts/header/header';
import { Button, IconButton, Typography } from '@/shared/ui';
import { LangSwitcher } from '@/widgets/header/LangSwitcher';
import Link from 'next/link';

import s from '@/widgets/layouts/public-layout/public-header/public-header.module.scss';

export const PrivateHeader = () => {
  return (
    <Header>
      <div className={s.content}>
        <Typography.Large component={Link} href={'/'}>
          Inctagram
        </Typography.Large>
        <div className={s.controlsWrapper}>
          <IconButton>
            <BellIcon />
          </IconButton>
          <LangSwitcher />
        </div>
      </div>
    </Header>
  );
};
