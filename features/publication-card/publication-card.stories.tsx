import { ReactImageGalleryItem } from 'react-image-gallery';

import EmailConfirmedImage from '@/assets/img/email-confirmed-image.svg?url';
import LinkExpiredImage from '@/assets/img/link-expired-image.svg?url';
import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { Meta, StoryObj } from '@storybook/react';

import { PublicationCard } from './publication-card';

export const getMockImages = (count: number) => {
  const DEFAULT_IMAGES = [MockUserAvatar, LinkExpiredImage, EmailConfirmedImage];

  return new Array(count).fill(0).map<ReactImageGalleryItem>((_, i) => ({
    original: DEFAULT_IMAGES[i % DEFAULT_IMAGES.length].src,
  }));
};

const meta = {
  argTypes: {
    onPublish: {
      action: 'Publish post',
      description: 'function for publication post on the server',
    },
  },
  component: PublicationCard,
  decorators: [
    Story => (
      <div style={{ width: 970 }}>
        <Story />
      </div>
    ),
  ],
  excludeStories: ['getMockImages'],
  parameters: {
    docs: {
      description: {
        component: 'Publication card that is used in stepper to create and publish a post',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'features/PublicationCard',
} satisfies Meta<typeof PublicationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: getMockImages(3),
  },
};
