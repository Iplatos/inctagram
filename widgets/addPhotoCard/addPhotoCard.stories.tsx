import { ChangeEvent, useState } from 'react';

import { useAvatarUploader } from '@/features/avatar-uploader/useAvatarUploader';
import { Meta, StoryObj } from '@storybook/react';

import { AddPhotoCard } from './addPhotoCard';

type CardRenderProps = {
  draft?: boolean;
  error: null | string;
  title: string;
};

const CardRender = (props: CardRenderProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const {
    actions: { loadedFromDevice },
    dispatch,
  } = useAvatarUploader();
  const uploadFromDevice = (e: ChangeEvent<HTMLInputElement>) => {
    const preview = e.target.files?.[0];

    if (!preview) {
      return;
    }

    dispatch(loadedFromDevice(preview));
  };

  return (
    <AddPhotoCard
      draft={props.draft}
      error={props.error}
      onClose={() => setOpen(false)}
      open={open}
      setImg={uploadFromDevice}
      title={props.title}
    />
  );
};

const meta = {
  component: CardRender,
  tags: ['autodocs'],
  title: 'Components/AddPhotoCard',
} satisfies Meta<typeof AddPhotoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddProfilePhoto: Story = {
  args: {
    error: null,
    title: 'Add a profile photo',
  },
};

export const AddPhotoWithDraft: Story = {
  args: {
    draft: true,
    error: null,
    title: 'Add Photo',
  },
};

export const AddPhotoCardWithError: Story = {
  args: {
    error: 'A photo size should be less than 10 MB',
    title: 'Add a profile photo',
  },
};
