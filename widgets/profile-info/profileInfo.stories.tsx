import { FC, ReactElement } from 'react';

import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { ProfileSummaryItem } from '@/features/profile-info/profile-summary';
import { capitalise } from '@/shared/helpers/capitalise';
import { Button, ButtonProps } from '@/shared/ui';
import { action, action as storybookAction } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { ProfileInfo, ProfileInfoProps } from './profileInfo';

type ButtonVariant = {
  name: string;
  variant: NonNullable<ButtonProps<'button'>['variant']>;
};
type ButtonVariantOption = `${ButtonVariant['variant']} button`;
type ButtonsMap = Record<ButtonVariantOption, ReactElement>;

const buttonVariants: ButtonVariant[] = [
  { name: 'Follow', variant: 'primary' },
  { name: 'Send Message', variant: 'secondary' },
  { name: 'Unfollow', variant: 'tertiary' },
];

const getButtonsByActionCategory = (category: 'primary' | 'secondary'): ButtonsMap =>
  buttonVariants.reduce(
    (buttonsMap, { name, variant }) => ({
      ...buttonsMap,
      [`${variant} button`]: (
        <Button
          onClick={action(`on${capitalise(category)}ActionClick`)}
          style={{ height: '100%', width: '100%' }}
          variant={variant}
        >
          {name}
        </Button>
      ),
    }),
    {} as ButtonsMap
  );

const primaryButtons = { ...getButtonsByActionCategory('primary'), none: undefined };
const secondaryButtons = { ...getButtonsByActionCategory('secondary'), none: undefined };

type CustomStatisticItem = Omit<ProfileSummaryItem, 'action'> & { action?: boolean };
type UserProfilePropsAndCustomArgs = Omit<ProfileInfoProps, 'statistics'> & {
  avatarSrc: boolean;
  statistics: CustomStatisticItem[];
};

const CustomRender: FC<UserProfilePropsAndCustomArgs> = ({
  avatarProps,
  avatarSrc,
  statistics,
  ...props
}) => (
  <ProfileInfo
    avatarProps={{ ...avatarProps, src: avatarSrc ? avatarProps.src : undefined }}
    statistics={statistics.map(s => ({
      ...s,
      action: s.action ? storybookAction(`on${capitalise(s.name)}Click`) : undefined,
    }))}
    {...props}
  />
);

/**
 * The ProfileInfo widget is embedded on the user's page to display information about the user's profile
 * and also provides some contextual actions for the authorised user, such as "follow", "send message", etc.
 * */
const meta = {
  argTypes: {
    aboutMe: {
      description: `Brief information about the user`,
      table: { type: { summary: 'string' } },
      type: { name: 'string', required: true },
    },

    avatarSrc: {
      control: 'boolean',
      description: `Path to the user's avatar. Takes the same value as NextJs
        [Image](https://nextjs.org/docs/app/api-reference/components/image#src) component.
        If the value is missing, a fallback image will be used.`,
      table: {
        type: { summary: 'string | StaticImport' },
      },
    },

    primaryAction: {
      description: `Used for basic contextual interaction with user profile.
        One of 2 possible interactions for this widget. If you need to place more than 2 actions in the widget,
        consider using a select-like component in place of \`PrimaryAction\` or placing the main action as
        \`PrimaryAction\` and additional actions inside the select-like component as \`SecondaryAction\`.\t
        An action has a wrapper with explicit size settings. To match these settings, set
        \`{ width: 100%; height: 100%; }\` css rule to the passed react element.`,
      mapping: primaryButtons,
      options: Object.keys(primaryButtons),
      table: { type: { summary: 'ReactElement' } },
      // set `type` property manually to mark this prop as `required` in storybook docs
      type: { name: 'object', required: true, value: {} },
    },

    secondaryAction: {
      description: `Same as \`PrimaryAction\`.`,
      mapping: secondaryButtons,
      options: Object.keys(secondaryButtons),
      table: { type: { summary: 'ReactNode' } },
    },

    statistics: {
      description: `A summary of the user's activity. If an \`action\` callback is provided,
        the statistics item can be clicked, which will trigger an \`action\` callback.`,
      table: {
        type: {
          detail: '{\n  action?: () => void;\n  name: string;\n  value: number;\n}[]',
          summary: 'ProfileSummaryItem[]',
        },
      },
      // set `type` property manually to mark this prop as `required` in storybook docs
      type: { name: 'object', required: true, value: {} },
    },

    userName: {
      description: `User Name. It has a limited length to prevent shifting of sibling elements,
        especially in mobile view. When its length is reached, it is truncated with the help of a ellipsis.`,
      type: { name: 'string', required: true },
    },
  },

  component: CustomRender,
  decorators: [
    Story => (
      <div style={{ maxWidth: '1060px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'WIDGETS/ProfileInfo',
} satisfies Meta<UserProfilePropsAndCustomArgs>;

export default meta;
type Story = StoryObj<UserProfilePropsAndCustomArgs>;

export const PrimaryAction: Story = {
  args: {
    aboutMe:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    avatarProps: {
      offsetX: 0.5,
      offsetY: 0.5,
      scale: 1,
      src: MockUserAvatar,
    },
    avatarSrc: true,
    primaryAction: primaryButtons['primary button'],
    secondaryAction: secondaryButtons.none,
    statistics: [
      { action: true, name: 'following', value: 2218 },
      { action: true, name: 'followers', value: 2358 },
      { action: false, name: 'publications', value: 2764 },
    ],
    userName: 'CanceledFromInstagram',
  },
};

export const SecondaryAction: Story = {
  args: {
    ...PrimaryAction.args,
    secondaryAction: getButtonsByActionCategory('secondary')['secondary button'],
  },
};

export const MissingAvatar: Story = {
  args: {
    ...PrimaryAction.args,
    avatarSrc: false,
    primaryAction: primaryButtons['tertiary button'],
  },
};
