import type { Meta, StoryObj } from '@storybook/react';

import { FC } from 'react';

import { Slider, SliderProps, SliderSlot } from './slider';

type GetStockValueParams = Pick<SliderProps, 'max' | 'thumbsCount' | 'value'>;

const CustomRender: FC<SliderProps> = props => {
  const { defaultValue, max = 0, thumbsCount = 1 } = props;

  const getStockValue = ({ max = 0, thumbsCount = 1, value }: GetStockValueParams) =>
    value ??
    new Array(thumbsCount).fill(0).map((_, i) => Math.floor(max / (thumbsCount + 1)) * (i + 1));

  return (
    <Slider {...props} defaultValue={getStockValue({ max, thumbsCount, value: defaultValue })} />
  );
};

/**
 * Input where the user selects a value from a given range.
 *
 * This component is based on the primitive [Slider](https://www.radix-ui.com/primitives/docs/components/slider#vertical-orientation) component from Radix. Almost all Radix props are supported.
 * Multiple thumbs are supported.
 */
const meta = {
  argTypes: {
    classes: {
      description: `An object containing the names of the classes corresponding to the
        component slots. Provided classnames will be merged with default slots classnames.`,
      table: {
        defaultValue: { summary: '{}' },
        type: {
          detail: `Partial<${JSON.stringify(
            {
              range: 'string',
              sliderRoot: 'string',
              thumb: 'string',
              track: 'string',
            } as Record<SliderSlot, string>,
            null,
            2
          )}>`,
          summary: 'SliderClasses',
        },
      },
    },

    defaultValue: {
      control: 'object',
      description: `The value of the slider when initially rendered. Use when you do not need to control the state of the slider.\t
      _NOTE_: This value should be kept consistent with the \`thumbsCount\` value.
      Consider passing the length of the value array as the \`thumbsCount\` value as a single source of truth`,
      table: { type: { summary: 'number[]' } },
    },

    disabled: {
      description: 'When `true`, prevents the user from interacting with the slider.',
      table: { type: { summary: 'boolean' } },
    },

    inverted: {
      description: 'Whether the slider is visually inverted',
      table: { type: { summary: 'boolean' } },
    },

    max: {
      description: 'The maximum value for the range.',
      table: { defaultValue: { summary: '100' }, type: { summary: 'number' } },
    },

    min: {
      description: 'The minimum value for the range.',
      table: { defaultValue: { summary: '0' }, type: { summary: 'number' } },
    },

    minStepsBetweenThumbs: {
      description: 'The minimum permitted `step`s between multiple thumbs.',
      table: { defaultValue: { summary: '1' }, type: { summary: 'number' } },
    },

    onValueChange: {
      control: 'action',
      description: 'Event handler called when the value changes.',
      table: { type: { summary: '(value: number[]) => void' } },
    },

    onValueCommit: {
      control: 'action',
      description: `Event handler called when the value changes at the end of an interaction.
      Useful when you only need to capture a final value e.g. to update a backend service.`,
      table: { type: { summary: '(value: number[]) => void' } },
    },

    orientation: {
      control: 'inline-radio',
      description: 'The orientation of the slider.',
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'horizontal | vertical' },
      },
    },

    size: {
      control: 'inline-radio',
      description: 'One of the predefined sizes.',
      options: ['small', 'medium'],
      table: { defaultValue: { summary: 'medium' }, type: { summary: 'small | medium' } },
    },

    step: {
      description: 'The stepping interval.',
      table: { defaultValue: { summary: '1' }, type: { summary: 'number' } },
    },

    thumbsCount: {
      description: `Number of thumbs.\t
      _NOTE_: This value should be kept consistent
      with the length of the \`defaultValue\` or \`value\` array to avoid internal state errors.
      Consider passing the \`length\` of the value array as the \`thumbsCount\` value as a single source of truth.`,
      table: { defaultValue: { summary: '1' }, type: { summary: 'number' } },
    },

    value: {
      control: 'object',
      description: `The controlled value of the slider. Must be used in conjunction with \`onValueChange\`.\t
      _NOTE_: This value should be kept consistent with the \`thumbsCount\` value.
      Consider passing the length of the value array as the \`thumbsCount\` value as a single source of truth.`,
      table: { type: { summary: 'number[]' } },
    },
  },
  component: CustomRender,
  decorators: [
    Story => (
      <div
        style={{
          backgroundColor: 'var(--color-dark-500)',
          maxWidth: 'fit-content',
          padding: '3rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'UI/Slider',
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneThumb: Story = {
  args: {
    disabled: false,
    inverted: false,
    max: 100,
    min: 0,
    minStepsBetweenThumbs: 1,
    orientation: 'horizontal',
    size: 'medium',
    step: 1,
    thumbsCount: 1,
    value: undefined,
  },
};

export const TwoThumbs: Story = {
  args: {
    ...OneThumb.args,
    thumbsCount: 2,
  },
};

export const Small: Story = {
  args: {
    ...OneThumb.args,
    size: 'small',
  },
};
