import { getPGWithCropMockItems } from '@/features/photo-gallery-with-crop/photo-gallery-with-crop.stories';
import { Meta, StoryObj } from '@storybook/react';

import { CreatePostCard } from '.';

const meta = {
  argTypes: {
    onPrevClick: { control: 'action' },
    onPublishPost: { control: 'action' },
  },
  component: CreatePostCard,
  decorators: [
    Story => (
      <div style={{ height: 'calc(-2rem + 100vh)' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CreatePostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: getPGWithCropMockItems(5).map(({ cropperProps: { aspectRatio } = {}, original }) => ({
      aspectRatio,
      filter: 'normal',
      src: original,
    })),
    textLimit: 20,
    title: 'Publish',
    userName: 'User Name',
  },
};

export const Error: Story = {
  args: {
    ...Primary.args,
    description:
      // cSpell: disable-next-line
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consequuntur, sapiente aperiam, praesentium exercitationem tenetur voluptatum delectus quam quasi veritatis aliquid similique tempore. Facere non at nisi id fugiat quam quas cumque quos exercitationem voluptatum amet, praesentium, iste eos sunt possimus illum repudiandae voluptatem perferendis corporis natus magni harum libero!',
  },
};
