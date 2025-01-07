import React from 'react';

import { CopyOutline } from '@/assets/icons/copy-outline';
import { PersonRemoveOutline } from '@/assets/icons/person-remove-outline';
import { ThreeDots } from '@/assets/icons/three-dots';
import { GetPostByIdResponse } from '@/shared/api/posts-api';
import { IconButton, Typography, UserBanner } from '@/shared/ui';
import { DropDown } from '@/shared/ui/drop-down-menu';

import styles from './publication.module.scss';

type Props = {
  postData: GetPostByIdResponse;
  relativeTimeString: string;
};

export const PublicationHeader = (props: Props) => {
  const { postData, relativeTimeString } = props;

  return (
    <div className={styles.header}>
      <UserBanner link={postData?.avatarOwner} userName={postData?.userName || 'User'} />
      <span className={styles.headerDot}></span>
      <Typography.SmallText className={styles.headerTime}>
        {relativeTimeString}
      </Typography.SmallText>
      <div className={styles.headerDropDown}>
        <DropDown.Menu
          align={'end'}
          className={styles.headerDropDownContent}
          trigger={
            <IconButton>
              <ThreeDots />
            </IconButton>
          }
        >
          <DropDown.Item className={styles.headerDropDownItem}>
            <PersonRemoveOutline />
            <Typography.Regular14>Unfollow</Typography.Regular14>
          </DropDown.Item>
          <DropDown.Item>
            <CopyOutline />
            <Typography.Regular14>Copy link</Typography.Regular14>
          </DropDown.Item>
        </DropDown.Menu>
      </div>
    </div>
  );
};
