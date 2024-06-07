import type { Meta, StoryObj } from '@storybook/react';

import { JSX, MouseEvent, RefAttributes, useState } from 'react';

import { CalendarFilled } from '@/assets/icons/calendar-filled';
import { CalendarOutlined } from '@/assets/icons/calendar-outlined';
import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { Typography } from '@/shared/ui/typography';

import { IconButton, IconButtonProps, IconButtonSize } from './IconButton';

const options = ['heart', 'calendar'] as const;

const iconsMap: Record<(typeof options)[number], JSX.Element> = {
  calendar: <CalendarOutlined />,
  heart: <HeartOutlined />,
};
const activeIconsMap: Record<(typeof options)[number], JSX.Element> = {
  calendar: <CalendarFilled />,
  heart: <HeartFilled style={{ color: 'var(--color-danger-300, red)' }} />,
};

// Since Storybook loses the generic parameter from `IconButtonProps<T>`,
// you should manually type the props for correct typing of the stories and meta object.
type CustomRenderProps = IconButtonProps<'button'> & {
  icon: (typeof options)[number];
  isToggle?: boolean;
};

const CustomRender = ({ icon, isToggle = true, ...props }: CustomRenderProps) => {
  const [active, setActive] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);

    if (!props.disabled && isToggle) {
      setActive(prev => !prev);
    }
  };

  return (
    <IconButton {...props} onClick={handleClick}>
      {active ? activeIconsMap[icon] : iconsMap[icon]}
    </IconButton>
  );
};

/**
 * A common icon-like component found on application panels and toolbars.
 *
 * It is polymorphic and supports all the props of its root component as well as a set of dimensions predefined by the application.
 */
const meta = {
  argTypes: {
    className: {
      description: 'The name of the CSS class to be passed to the root component',
      table: { type: { summary: 'string' } },
    },

    component: {
      control: false,
      description: 'The component to be used as the root of the IconButton under the hood.',
      table: { defaultValue: { summary: 'button' }, type: { summary: 'ElementType' } },
    },

    disabled: {
      description: `When \`true\`, prevents the user from interacting with the button.
        CSS-property \`pointer-events: none\` is set in this case.`,
      table: { type: { summary: 'boolean' } },
    },

    icon: {
      control: { type: 'select' },
      description: `STORYBOOK_SPECIFIC_SETTING: An icon to demonstrate how the component works. 
        It toggles the view, simulating the \`active\` state.\t
        __NOTE:__ The \`IconButton\` component itself has no state switching functionality.`,
      options: options,
      table: { type: { summary: 'string' } },
    },

    onClick: { control: 'action' },

    ref: {
      description: 'The ref is forwarded to the root element, which by default is `button`.',
      table: { type: { summary: 'ForwardedRef<ElementRef<T>>' } },
    },

    size: {
      control: 'inline-radio',
      description: `One of the preset sizes. It has the following characteristics:\t
        _small:_ iconSize: 16px, buttonPadding: 4px\t
        _medium:_ iconSize: 24px, buttonPadding: 6px\t
        _large:_ iconSize: 36px, buttonPadding: 6px\t
        `,
      options: ['small', 'medium', 'large'] satisfies IconButtonSize[],
      table: { defaultValue: { summary: 'medium' }, type: { summary: 'small | medium | large' } },
    },
  },

  decorators: [
    Story => (
      <>
        <Typography.Regular14 component={'p'} style={{ marginBottom: '1rem' }}>
          <span style={{ fontStyle: 'italic' }}>NOTE:</span> Setting the active state of the button
          has been added for demonstration purposes. The component itself does not have this
          behavior.
        </Typography.Regular14>
        <Story />
      </>
    ),
  ],
  render: CustomRender,
  tags: ['autodocs'],
  title: 'UI/IconButton',
} satisfies Meta<CustomRenderProps & RefAttributes<'button'>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    disabled: false,
    icon: 'heart',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    ...Small.args,
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    ...Small.args,
    size: 'large',
  },
};

// Manually typing IconButtonProps to be able to pass the `a` tag as a `component` and its associated props
export const AsLink: StoryObj<IconButtonProps<'a'>> = {
  args: {
    ...Medium.args,
    component: 'a',
    href: '/?path=/docs/ui-iconbutton--docs',
    isToggle: false,
    title: 'go to IconButton docs',
  },
};
