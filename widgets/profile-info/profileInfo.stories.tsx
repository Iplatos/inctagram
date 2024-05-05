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
type ButtonsMap = Record<(typeof buttonVariants)[number]['name'], ReactElement>;

const buttonVariants = [
  { name: 'follow', variant: 'primary' } as const,
  { name: 'send message', variant: 'secondary' } as const,
  { name: 'unfollow', variant: 'tertiary' } as const,
  { name: 'profile settings', variant: 'secondary' } as const,
] satisfies ButtonVariant[];

const getButtonsByActionCategory = (category: 'primary' | 'secondary'): ButtonsMap =>
  buttonVariants.reduce(
    (buttonsMap, { name, variant }) => ({
      ...buttonsMap,
      [name]: (
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
export type ProfileInfoPropsAndCustomArgs = Omit<ProfileInfoProps, 'statistics'> & {
  avatarSrc: boolean;
  statistics: CustomStatisticItem[];
};

const CustomRender: FC<ProfileInfoPropsAndCustomArgs> = ({
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
 * and also provides some contextual actions for the authorized user, such as "follow", "send message", etc.
 * */
const meta = {
  argTypes: {
    aboutMe: {
      description: `Brief information about the user`,
      table: { type: { summary: 'string' } },
      type: { name: 'string', required: true },
    },

    avatarProps: {
      description: `Optional object representing a set of props for the [Avatar](/?path=/docs/ui-avatar--docs) component.
      The \`src\` field takes the same value as the Next.js [Image](https://nextjs.org/docs/app/api-reference/components/image#src) component.
      If the value is missing, the backup image will be used.`,
      table: {
        type: {
          detail: `Partial<${JSON.stringify(
            {
              offsetX: 'number',
              offsetY: 'number',
              scale: 'number',
              src: 'StaticImport | string',
            },
            null,
            2
          )}>`,
          summary: 'AvatarProps',
        },
      },
    },

    avatarSrc: {
      description: `STORYBOOK_SPECIFIC_SETTING: allows you to dynamically switch the \`src\` prop for the underlying [Avatar](/?path=/docs/ui-avatar--docs)  component.`,
      table: { type: { summary: 'boolean' } },
    },

    className: {
      description: `The class name will be applied to the underlying \`section\` component, e.g. the root container of the component`,
      table: { type: { summary: 'string' } },
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
      <div style={{ maxWidth: '972px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'WIDGETS/ProfileInfo',
} satisfies Meta<ProfileInfoPropsAndCustomArgs>;

export default meta;
type Story = StoryObj<ProfileInfoPropsAndCustomArgs>;

export const UnfollowedUser: Story = {
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
    primaryAction: primaryButtons['follow'],
    secondaryAction: secondaryButtons['send message'],
    statistics: [
      { action: true, name: 'following', value: 2218 },
      { action: true, name: 'followers', value: 2358 },
      { action: false, name: 'publications', value: 2764 },
    ],
    userName: 'CanceledFromInstagram',
  },
};

export const FollowedUser: Story = {
  args: {
    ...UnfollowedUser.args,
    primaryAction: primaryButtons['unfollow'],
  },
};

export const MyProfile: Story = {
  args: {
    ...UnfollowedUser.args,
    primaryAction: primaryButtons['profile settings'],
    secondaryAction: secondaryButtons.none,
  },
};

export const MissingAvatar: Story = {
  args: {
    ...UnfollowedUser.args,
    avatarSrc: false,
  },
};
