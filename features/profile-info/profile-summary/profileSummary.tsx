import { FC } from 'react';

import { compartmentalize } from '@/shared/helpers';
import { Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './profileSummary.module.scss';
type ProfileSummarySlot = 'item' | 'itemName' | 'itemValue' | 'items';
export type ProfileSummaryClasses = { [P in ProfileSummarySlot]?: string };

export type ProfileSummaryItem = {
  action?: () => void;
  name: string;
  value: number;
};

type ProfileSummaryProps = {
  classes?: ProfileSummaryClasses;
  summary: ProfileSummaryItem[];
};

export const ProfileSummary: FC<ProfileSummaryProps> = ({ classes = {}, summary }) => {
  const cls = getClassNames(classes);

  return (
    <div className={cls.items}>
      {summary.map(({ action, name, value }) => (
        <button className={cls.item} disabled={!action} key={name} onClick={action}>
          <Typography.Bold14 className={cls.itemValue}>{compartmentalize(value)}</Typography.Bold14>
          <Typography.Regular14 className={cls.itemName}>{name}</Typography.Regular14>
        </button>
      ))}
    </div>
  );
};

const getClassNames = (classes: ProfileSummaryClasses): ProfileSummaryClasses => ({
  item: clsx(classes.item, s.item),
  itemName: clsx(classes.itemName, s.itemName),
  itemValue: clsx(classes.itemValue, s.itemValue),
  items: clsx(classes.items, s.items),
});
