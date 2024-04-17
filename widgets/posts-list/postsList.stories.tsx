import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { CropProps } from '@/shared/ui/croppedImage/CroppedImage';
import { Meta, StoryObj } from '@storybook/react';

import { Post, PostsList } from './postsList';

const getRandomNumber = () => +Math.random().toFixed(2);
const getRandomCropProps = (): CropProps => ({
  offsetX: getRandomNumber(),
  offsetY: getRandomNumber(),
  scale: getRandomNumber() + 1,
});

// TODO: add control for the number of images
const meta = {
  component: PostsList,
  decorators: [
    Story => (
      <div style={{ maxWidth: '972px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'WIDGETS/PostsList',
} satisfies Meta<typeof PostsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const posts = Array(17)
  .fill(0)
  .map(() => ({ cropProps: getRandomCropProps(), src: MockUserAvatar }) as Post);

export const Primary: Story = {
  args: { posts },
};
