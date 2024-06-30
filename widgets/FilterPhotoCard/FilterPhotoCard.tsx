import { MouseEventHandler, useEffect, useMemo } from 'react';

import { ArrowIOSBack } from '@/assets/icons/arrow-ios-back';
import { capitalise } from '@/shared/helpers';
import { Button, Card, IconButton, Typography } from '@/shared/ui';
import { createFilter } from 'cc-gram';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import s from './FilterPhotoCard.module.scss';

import { getPhoto, useFilter } from './useFilter';

type FilterPhotoCardProps = {
  onNextClick: MouseEventHandler<HTMLButtonElement>;
  onPrevClick: MouseEventHandler<HTMLButtonElement>;
  src: StaticImport | string;
};

export const FilterPhotoCard = ({ onNextClick, onPrevClick, src }: FilterPhotoCardProps) => {
  const filter = useMemo(() => createFilter({}), []);

  const { dispatch, state } = useFilter();

  useEffect(() => filter.applyFilter(), [filter, state.filter]);

  const filterNames = ['normal', ...filter.filterNames.sort((a, b) => a.localeCompare(b))];

  return (
    <Card className={s.cardRoot}>
      <Card.Header className={s.header}>
        <IconButton onClick={onPrevClick}>
          <ArrowIOSBack />
        </IconButton>
        <Typography.H1 className={s.headerTitle} component={'h2'}>
          Filters
        </Typography.H1>
        <Button onClick={onNextClick} variant={'text'}>
          Next
        </Button>
      </Card.Header>

      <div className={s.contentWrapper}>
        <div className={s.previewWrapper}>
          <Image
            alt={'preview a photo with the selected filter'}
            data-filter={state.filter}
            fill
            priority
            src={src}
          />
        </div>

        <Card.Content className={s.filtersList}>
          {filterNames.map(el => (
            <div className={s.filterItem} key={el}>
              <div className={s.filterImageWrapper}>
                <Image
                  alt={`${filter} filter`}
                  data-filter={el}
                  fill
                  onClick={() => dispatch(getPhoto({ filter: el }))}
                  src={src}
                />
              </div>
              <Typography.Regular16 className={s.filterTitle}>
                {capitalise(el, true)}
              </Typography.Regular16>
            </div>
          ))}
        </Card.Content>
      </div>
    </Card>
  );
};
