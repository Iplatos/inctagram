import { useEffect, useId, useMemo } from 'react';

import { ArrowIOSBack } from '@/assets/icons/arrow-ios-back';
import { Button, Card, IconButton, Typography } from '@/shared/ui';
import { CroppedImage } from '@/shared/ui/croppedImage';
import { createFilter } from 'cc-gram';

import s from './FilterPhotoCard.module.scss';

import { getPhoto, useFilter } from './useFilter';

type FilterPhotoCardProps = {
  onNextClick: () => void;
  onPrevClick: () => void;
  src: string;
};

export const FilterPhotoCard = (props: FilterPhotoCardProps) => {
  const id = useId();

  const filter = useMemo(() => createFilter({}), []);

  const { dispatch, state } = useFilter();

  useEffect(() => filter.applyFilter(), [filter, state.filter]);

  const filterNames: string[] = filter.filterNames;

  return (
    <Card>
      <Card.Header className={s.header}>
        <IconButton onClick={() => props.onPrevClick()}>
          <ArrowIOSBack />
        </IconButton>
        <Typography.H1>Filters</Typography.H1>
        <Button onClick={() => props.onNextClick()} variant={'text'}>
          <Typography.H3 className={s.next}>Next</Typography.H3>
        </Button>
      </Card.Header>
      <Card.Content className={s.content}>
        <span>
          {' '}
          <CroppedImage
            alt={'testImg'}
            data-filter={state.filter}
            height={504}
            src={props.src}
            width={504}
          />
        </span>
        <span className={s.filters}>
          {filterNames.map(el => (
            <span className={s.item} key={id}>
              <div className={s.image}>
                <CroppedImage
                  alt={'test image'}
                  data-filter={el}
                  height={108}
                  onClick={() => {
                    dispatch(getPhoto({ filter: el }));
                  }}
                  src={props.src}
                  width={108}
                />
              </div>
              <div>
                <Typography.Regular14>{el}</Typography.Regular14>
              </div>
            </span>
          ))}
        </span>
      </Card.Content>
    </Card>
  );
};
