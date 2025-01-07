import { useTranslation } from '@/shared/hooks';
import { Header } from '@/shared/layouts/header/header';
import { Button, Typography } from '@/shared/ui';
import { LangSwitcher } from '@/widgets/header/LangSwitcher';
import Link from 'next/link';

import s from './public-header.module.scss';

export const PublicHeader = () => {
  const { t } = useTranslation();

  return (
    <Header>
      <div className={s.content}>
        <Typography.Large component={Link} href={'/public-posts'}>
          Inctagram
        </Typography.Large>
        <div className={s.controlsWrapper}>
          <LangSwitcher />
          <div className={s.buttonsWrapper}>
            <Button component={'span'} variant={'text'}>
              <Link href={'/sign-in'}>{t.navbar.signIn}</Link>
            </Button>
            <Button component={'span'}>
              <Link href={'/sign-up'}>{t.navbar.signUp}</Link>
            </Button>
          </div>
        </div>
      </div>
    </Header>
  );
};
