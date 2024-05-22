import { useEffect, useState } from 'react';

import UserAvatar from '@/assets/img/mock-user-avatar.jpg';
import * as CroppedImageStories from '@/shared/ui/croppedImage/croppedImage.stories';
import { Typography } from '@/shared/ui/typography';
import { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarClasses, AvatarProps } from './avatar';

type AvatarPropsAndCustomArgs = AvatarProps & { imageType: 'dynamic' | 'static' };

const CustomRender = ({ delayMs, imageType, src, ...args }: AvatarPropsAndCustomArgs) => {
  const wait = (ms?: number) =>
    new Promise(res => {
      setTimeout(res, ms);
    });

  const [url, setUrl] = useState('');

  useEffect(() => {
    if (imageType === 'static') {
      return;
    }

    wait(delayMs)
      .then(() => fetch('https://jsonplaceholder.typicode.com/albums/1/photos?id=1'))
      .then(response => response.json())
      .then(json => setUrl(json[0].url));
  }, [delayMs, imageType]);

  return (
    <Avatar
      delayMs={delayMs ? delayMs + 500 : delayMs}
      src={imageType === 'static' ? src : url}
      {...args}
    />
  );
};

/**
 * An image element with a fallback for representing the user. It is build on top of the [CroppedImage](?path=/docs/ui-croppedimage--docs) component. All features of the Next.js [Image](https://nextjs.org/docs/pages/api-reference/components/image) component are supported.
 * The inner CroppedImage is rendered using [fill](https://nextjs.org/docs/pages/api-reference/components/image#fill) prop, so `fill`, `height`, `width` props are omitted.
 *
 * Main features:
 * * Fallback is shown if no image `src` is specified or the image was loaded with an error.
 * * The display of the fallback can be delayed, for example if `src` is not available immediately after Avatar mount.
 * */
const meta = {
  argTypes: {
    classes: {
      control: { type: 'object' },
      description: `An object containing the names of the classes corresponding to the
        component slots. Provided classnames will be merged with default slots classnames.`,
      table: {
        defaultValue: { summary: '{ }' },
        type: {
          //prettier-ignore
          detail: `Partial<${JSON.stringify(
            { avatarRoot: 'string', fallback: 'string', image: 'string', viewBox: 'string' } as AvatarClasses,
            null,
            2
          )}>`,
          summary: 'AvatarClasses',
        },
      },
    },

    delayMs: {
      control: 'number',
      description:
        'Can be used to delay fallback rendering if image `src` is not available immediately after Avatar is mounted',
    },

    fallback: {
      defaultValue: { summary: '<AvatarFallback />' },
      description: `An element that renders when the image hasn't loaded. This means whilst it's loading, or if there was an error.
        If you notice a flash during loading, you can provide a \`delayMs\` prop to delay its rendering.`,
      table: { type: { summary: 'ReactNode' } },
    },

    imageType: {
      control: 'inline-radio',
      defaultValue: { summary: 'static' },
      description:
        '_STORYBOOK_SPECIFIC_SETTING:_ controls whether to use a static image from the assets folder or get the image from the [jsonplaceholder fake API](https://jsonplaceholder.typicode.com/).',
      options: ['static', 'dynamic'],
    },

    offsetX: CroppedImageStories.default.argTypes.offsetX,

    offsetY: CroppedImageStories.default.argTypes.offsetY,

    scale: CroppedImageStories.default.argTypes.scale,

    size: {
      control: 'radio',
      description: `A preset set of common avatar sizes. All sizes are set with CSS em &lt;length&gt; value`,
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'small | medium | large' },
      },
    },

    src: {
      control: false,
      description: 'Unlike Next.js Image it is not required.',
      table: { type: { summary: 'string | StaticImport' } },
    },
  },

  component: CustomRender,

  decorators: [
    Story => (
      <div style={{ fontSize: '3rem' }}>
        <Typography.Regular16 component={'p'} style={{ marginBottom: '1rem' }}>
          The story&apos;s font size has been changed to <em>3 rem</em> to enlarge the content
        </Typography.Regular16>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      include: [
        'classes',
        'delayMs',
        'fallback',
        'imageType',
        'offsetX',
        'offsetY',
        'scale',
        'size',
        'src',
      ] satisfies (keyof AvatarPropsAndCustomArgs)[],
    },
  },
  title: 'UI/Avatar',
} satisfies Meta<AvatarPropsAndCustomArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StaticImage: Story = {
  args: {
    ...CroppedImageStories.Primary.args,
    imageType: 'static',
    src: UserAvatar,
  },
};

export const Fallback: Story = {
  args: {
    ...StaticImage.args,
    src: undefined,
  },
};

export const CustomFallback: Story = {
  args: {
    ...Fallback.args,
    fallback: <Typography.Bold16 style={{ fontSize: 'inherit' }}>GG</Typography.Bold16>,
  },
};

export const WrongUrl: Story = {
  args: {
    ...StaticImage.args,
    src: 'does-not-exist',
  },
};

export const AsLink: Story = {
  args: { ...StaticImage.args, alt: 'To alert docs' },
  render: args => (
    <a href={'/?path=/docs/ui-alert--docs'} title={'go to the Alert docs'}>
      <CustomRender {...args} />
    </a>
  ),
};

export const RemoteImage: Story = {
  args: { ...StaticImage.args, delayMs: 3000, imageType: 'dynamic' },
};
