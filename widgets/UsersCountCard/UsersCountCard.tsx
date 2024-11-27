import { useTranslation } from '@/shared/hooks';
import { Card, Typography } from '@/shared/ui';
import { Panel } from '@/shared/ui/panel';

import s from './usersCountCard.module.scss';

type Props = {
  userCount: number | undefined;
};

export const UsersCountCard = (props: Props) => {
  const { publicPage: t } = useTranslation().t;

  return (
    <Card className={s.card}>
      <Typography.H2>{t.registeredUsers}:</Typography.H2>
      <Panel usersCount={props.userCount} />
    </Card>
  );
};
