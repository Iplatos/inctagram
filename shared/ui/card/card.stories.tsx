import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { Avatar, Button, Typography } from '@/shared/ui';
import { Meta, StoryObj } from '@storybook/react';

import { Card } from './card';

/**
 * Cards are surfaces that display content and actions on a single topic.
 * The `Card` component includes several complementary utility components to handle various use cases:
 * * `Card.Content`: the wrapper for the Card content.
 * * `Card.Header`: an optional wrapper for the `Card.Content`.
 *
 * The `Card.Content` component provides convenient paddings for its content.
 * It also has a bottom border if it is not the last among neighboring elements.
 *
 * The `Card.Header` component extends the `Card.Content` styles.
 * It also aligns the content vertically and has a bottom margin if it is not the last among its neighbors
 * (similar to the `Content` component)
 *
 * Components `Header` and `Content` are also available as named imports `CardHeader`, `CardContent` for convenience.
 *
 * Each component of `Card`-like type extends the html tag `div` with all retained props.
 */
const meta = {
  argTypes: {
    children: {
      control: false,
      description: 'Any arbitrary `ReactNode` component',
      table: { type: { summary: 'ReactNode' } },
    },
    ref: {
      control: false,
      description: 'The `ref` is forwarded to the root `div` element',
      table: { type: { summary: 'ForwardedRef<HTMLDivElement>' } },
    },
  },
  component: Card,
  decorators: [
    Story => (
      <div style={{ maxWidth: 400 }}>
        <style>{`
          .buttons-group { display: flex; gap: 16px; }
          .button { flex: 1 1 0; }
        `}</style>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'UI/Card',
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const header = (
  <Card.Header>
    <Avatar src={MockUserAvatar} />
    <Typography.H1 component={'h4'} style={{ marginLeft: 16 }}>
      Long UserName
    </Typography.H1>
  </Card.Header>
);
const content = (
  <>
    <Card.Content>
      <Typography.Regular16 component={'p'}>Lorem, ipsum dolor.</Typography.Regular16>
    </Card.Content>

    <Card.Content>
      <Typography.Regular16 component={'p'}>
        {/* cSpell: disable */}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi consequuntur, exercitationem
        sunt iusto cum deleniti minus voluptates earum distinctio deserunt!
        {/* cSpell: enable */}
      </Typography.Regular16>
    </Card.Content>

    <Card.Content className={'buttons-group'}>
      <Button className={'button'}>Confirm</Button>
      <Button className={'button'} variant={'tertiary'}>
        Deny
      </Button>
    </Card.Content>
  </>
);

export const Basic: Story = {
  args: {
    children: (
      <>
        {header}
        {content}
      </>
    ),
  },
};

export const HeaderOnly: Story = {
  args: { children: header },
};

export const ContentOnly: Story = {
  args: { children: content },
};
