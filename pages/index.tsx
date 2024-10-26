import { useState } from 'react';

import {
  openModal,
  selectCreatePostModalItems,
  selectCreatePostModalOpen,
} from '@/shared/api/modal-slice';
import { useAppDispatch } from '@/shared/api/pretyped-redux-hooks';
import { useAppSelector } from '@/shared/api/store';
import { Button } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { ModalCreatePublication } from '@/widgets/modal-create-publication';

function Home() {
  const dispatch = useAppDispatch();

  return (
    <>
      <HeadMeta title={'main'} />
      <div style={{ marginLeft: '300px' }}>Hello World!</div>

      <Button onClick={() => dispatch(openModal())}>Add Post</Button>
      <ModalCreatePublication />
    </>
  );
}

Home.getLayout = getLayout;
export default Home;
