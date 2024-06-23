import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';

import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { Typography } from '@/shared/ui/typography';
import { Meta, ReactRenderer, StoryObj } from '@storybook/react';
import { DecoratorFunction } from '@storybook/types';
import { DEFAULT_FILTERS, createFilter } from 'cc-gram';

import { CroppedImage, CroppedImageClasses, CroppedImageProps } from './CroppedImage';

/**
 * This component is based on the Next.js [Image](https://nextjs.org/docs/pages/api-reference/components/image) component with the additional ability to scale and crop the image.
 * All these manipulations are done by CSS. The component supports all the features of Next/Image component.
 *
 * __Important__: for the cropping and scaling logic to work correctly, the component needs to be explicitly dimensioned.
 * That is, 2 conditions must be fulfilled:
 * * Either pass `fill={true}` or specify values for `width` and `height` props at the same time. [Read more](https://nextjs.org/docs/pages/api-reference/components/image#fill) about the `fill` prop.
 * * Scaling props have validation. Offsets must be between `0` and `1`, scale between `1` and `2`.
 *
 * If at least one condition is not met, the image is set to the default cropping props: `{ offsetX: 0.5, offsetY: 0.5, scale: 1 }` (without scale, the image is centred).
 * */
const meta = {
  argTypes: {
    classes: {
      description: `An object containing the names of the classes corresponding to the
        component slots. Provided classnames will be merged with default slots classnames.`,
      table: {
        type: {
          detail: `Partial<${JSON.stringify(
            { image: 'string', viewBox: 'string' } as CroppedImageClasses,
            null,
            2
          )}>`,
          summary: 'CroppedImageClasses',
        },
      },
    },

    fill: {
      control: { type: 'boolean' },
      description: `Has [the same](https://nextjs.org/docs/pages/api-reference/components/image#fill) behaviour as Next.js \`fill\` prop.\t
        _Tip:_ toggle the value to \`false\` in the Storybook Controls panel to open the \`width\` and \`height\` prop adjustments `,
      table: {
        type: { summary: 'boolean | undefined' },
      },
    },

    height: {
      control: 'number',
      description: `Has [the same](https://nextjs.org/docs/pages/api-reference/components/image#height) behaviour as Next.js \`height\` prop.`,
      if: { arg: 'fill', truthy: false },
      table: { type: { summary: '`${sting}` | number | undefined' } },
    },

    offsetX: {
      control: { max: 1, min: 0, step: 0.01, type: 'range' },
      description: `Image offset relative to the _left_ side of its view box in the range from \`0\` to \`1\` of its width.\t
          Allowed value is between \`0\` and \`1\`.\t
          If the allowed value is not met, all cropping and scaling props will be returned to the default value.
          Also an error will be shown in the console.`,
      table: {
        defaultValue: { summary: 0.5 },
      },
    },

    offsetY: {
      control: { max: 1, min: 0, step: 0.01, type: 'range' },
      description: `Image offset relative to the _top_ side of its view box in the range from \`0\` to \`1\` of its height.\t
          Allowed value is between \`0\` and \`1\`.\t
          If the allowed value is not met, all cropping and scaling props will be returned to the default value.
          Also an error will be shown in the console.`,
      table: {
        defaultValue: { summary: 0.5 },
      },
    },

    scale: {
      control: { max: 2, min: 1, step: 0.1, type: 'range' },
      description: `Image size scale relative to its view box size in range from \`1\` to \`2\`, which defines both width and height\t
          .Allowed value is between \`1\` and \`2\`.\t
          If the allowed value is not met, all cropping and scaling props will be returned to the default value.
          Also an error will be shown in the console.`,
      table: {
        defaultValue: { summary: 1 },
      },
    },
    width: {
      control: 'number',
      description: `Has [the same](https://nextjs.org/docs/pages/api-reference/components/image#width) behaviour as Next.js \`width\` prop.`,
      if: { arg: 'fill', truthy: false },
      table: { type: { summary: '`${sting}` | number | undefined' } },
    },
  },

  component: CroppedImage,
  decorators: [
    Story => (
      <>
        <Story />
        <Typography.Regular16 component={'p'} style={{ marginTop: '1rem' }}>
          <Typography.Bold16>TIP: </Typography.Bold16>
          Open the devtools console and see the errors and default actions associated with the wrong
          cropping props.
        </Typography.Regular16>
      </>
    ),
  ],
  parameters: {
    controls: { include: ['offsetX', 'offsetY', 'scale', 'fill', 'width', 'height', 'classes'] },
  },
  tags: ['autodocs'],
  title: 'UI/CroppedImage',
} satisfies Meta<typeof CroppedImage>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonStoryDecorator: DecoratorFunction<ReactRenderer, CroppedImageProps> = (Story, ctx) => (
  <div
    style={{
      ...(ctx.args.fill && { aspectRatio: 1, maxWidth: '300px', position: 'relative' }),
    }}
  >
    <Story />
  </div>
);

export const Primary: Story = {
  args: {
    alt: '',
    fill: true,
    offsetX: 0.5,
    offsetY: 0.5,
    scale: 1,
    src: MockUserAvatar,
  },
  decorators: [commonStoryDecorator],
};

export const WidenedOffsetRanges: Story = {
  argTypes: {
    offsetX: { control: { max: 2, min: -1 } },
    offsetY: { control: { max: 2, min: -1 } },
    scale: { control: { max: 3, min: 0 } },
  },
  args: Primary.args,
  decorators: [
    commonStoryDecorator,
    Story => (
      <>
        <Typography.Regular16 component={'p'} style={{ marginBottom: '1rem' }}>
          In this story, it is possible to set values to cropping props that are out of bounds. Use
          the sliders in the `Controls` panel to test the behaviour of the component.
        </Typography.Regular16>
        <Story />
      </>
    ),
  ],
};

export const FixedAspectRatio: Story = {
  args: {
    ...Primary.args,
    fill: false,
    height: 200,
    width: 320,
  },
  decorators: [commonStoryDecorator],
};

const CustomRenderWithFilters = ({ filter, ...props }: CroppedImageProps & { filter: string }) => {
  const filterRef = useRef(createFilter({ init: false }));

  useEffect(() => {
    filterRef.current.applyFilter();
  }, [filter]);

  return <CroppedImage data-filter={filter} {...props} />;
};

type StoryWithFilters = StoryObj<ComponentPropsWithoutRef<typeof CustomRenderWithFilters>>;

export const WithCCGramFilters: StoryWithFilters = {
  argTypes: {
    filter: {
      control: 'select',
      options: Array.from(DEFAULT_FILTERS.keys()),
    },
  },
  args: {
    ...Primary.args,
    filter: 'inkwell',
  },
  decorators: [
    commonStoryDecorator,
    Story => (
      <>
        <Typography.Regular16 component={'p'}>
          In this story, you can set a filter for a photo. Use the `filter` field in the `Controls`
          panel to test the behavior of the component.
        </Typography.Regular16>
        <Typography.Regular16 component={'p'} style={{ marginBlock: '1rem' }}>
          The photo filter is applied using the `filter` CSS property.
        </Typography.Regular16>
        <Story />
      </>
    ),
  ],
  parameters: {
    controls: {
      include: [...meta.parameters.controls.include, 'filter'],
    },
  },
  render: CustomRenderWithFilters,
};
