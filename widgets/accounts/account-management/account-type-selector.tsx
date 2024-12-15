import { useTranslation } from '@/shared/hooks';
import { Card, RadioGroup, Typography } from '@/shared/ui';

import s from './../../../entities/accounts/edit/account-management/account-management.module.scss';

type AccountTypeSelectorProps = {
  onAccTypeChange: (value: string) => void;
};

export const AccountTypeSelector = (props: AccountTypeSelectorProps) => {
  const { editProfile: t } = useTranslation().t;

  return (
    <>
      <div className={s.card}>
        <Typography.H3 className={s.header}>{t.accountManagement.accountType}</Typography.H3>
        <Card>
          <Card.Content>
            <RadioGroup
              onValueChange={value => props.onAccTypeChange(value)}
              options={[
                { label: t.accountManagement.personal, value: 'personal' },
                { label: t.accountManagement.business, value: 'business' },
              ]}
            ></RadioGroup>
          </Card.Content>
        </Card>
      </div>
    </>
  );
};
