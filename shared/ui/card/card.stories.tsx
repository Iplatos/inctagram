import { ElementRef, ForwardedRef, ReactElement, ReactNode } from 'react';

import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { Replace } from '@/shared/types/helpers';
import { Button } from '@/shared/ui/Button';
import { Avatar } from '@/shared/ui/avatar';
import { Typography } from '@/shared/ui/typography';
import { Meta, StoryObj } from '@storybook/react';

import { Card, CardContentProps } from './card';

type DecoratorFunction = Exclude<Meta['decorators'], undefined>[number];
export const commonCardDecorator: DecoratorFunction = Story => (
  <>
    <style>{`
          .card-root-wrapper { width: 400px; max-width: 100%; display: flex; flex-direction: column; }
          .card-max-height { max-height: 50vh; }
          .buttons-group { display: flex; gap: 16px; }
          .button { flex: 1 1 0; }
        `}</style>
    <Story />
  </>
);

type CustomRenderProps =
  | (Omit<CardContentProps, 'children'> & {
      children?: undefined;
      renderChildren: (props: Pick<CardContentProps, 'ignoreHeader'>) => ReactNode;
    })
  | Replace<CardContentProps, { children: Iterable<ReactElement> | ReactElement }>;

const CustomRender = (props: CustomRenderProps) => {
  if (props.children === undefined) {
    const { ignoreHeader, renderChildren, ...restProps } = props;

    return <Card {...restProps}>{renderChildren({ ignoreHeader })}</Card>;
  }

  return <Card {...props} />;
};
/**
 * Cards are surfaces that display content and actions on a single topic.
 * The `Card` component includes several complementary utility components to handle various use cases:
 * * `Card.Content`: the wrapper for the Card content.
 * * `Card.Header`: an optional wrapper for the `Card.Content`.
 *
 * The `Card.Content` component provides convenient paddings for its content.
 * It also has a bottom border if it is not the last among neighboring elements.
 * You can pass the `ignoreHerder` prop to not increase the `padding-top`
 * of `Card.Content` immediately following `Card.Header`.
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
    className: {
      description: 'A class name provided to the underlying `div` element',
      table: { type: { summary: 'string' } },
    },
    ignoreHeader: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: `STORYBOOK_SPECIFIC_SETTING: Can be passed to \`Card.Content\` to avoid
        adding an increased \`padding-top\` to it if the preceding child component is \`Card.Header\`.
        By default, the indentation is increased.`,
      table: { type: { summary: 'boolean' } },
    },
    ref: {
      control: false,
      description: 'The `ref` is forwarded to the root `div` element',
      table: { type: { summary: 'ForwardedRef<HTMLDivElement>' } },
    },
  },
  decorators: [commonCardDecorator],
  excludeStories: ['cardHeader', 'cardContent', 'commonCardDecorator'],
  render: CustomRender,
  tags: ['autodocs'],
  title: 'UI/Card',
  // manually add the `ref` type to the `CustomRenderProps` to add its description to the `meta` object.
} satisfies Meta<CustomRenderProps & { ref: ForwardedRef<ElementRef<'div'>> }>;

export default meta;
type Story = StoryObj<CustomRenderProps>;

export const cardHeader = (
  <>
    <Avatar src={MockUserAvatar} />
    <Typography.H1 component={'h2'} style={{ marginLeft: 16 }}>
      Long UserName
    </Typography.H1>
  </>
);
export const cardContent = [
  <Typography.Regular16 component={'p'} key={'short'}>
    Lorem, ipsum dolor.
  </Typography.Regular16>,

  <Typography.Regular16 component={'p'} key={'long'}>
    {/* cSpell: disable */}
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero in, mollitia facilis nisi
    praesentium necessitatibus. Harum veritatis odit ullam ut earum recusandae totam quia impedit
    consequatur, illo minus, quidem in repellat possimus! Facilis obcaecati maiores tenetur! Velit,
    tempora aperiam obcaecati ut, labore impedit, recusandae necessitatibus quas porro dolor aut
    possimus ad perspiciatis nostrum dolores amet ullam. Optio reiciendis ab ipsum.
    {/* cSpell: enable */}
  </Typography.Regular16>,

  <div className={'buttons-group'} key={'buttons'}>
    <Button className={'button'}>Confirm</Button>
    <Button className={'button'} variant={'tertiary'}>
      Deny
    </Button>
  </div>,
];

export const HeaderOnly: Story = {
  args: { children: <Card.Header>{cardHeader}</Card.Header>, className: 'card-root-wrapper' },
};

export const ContentOnly: Story = {
  args: {
    className: 'card-root-wrapper',
    renderChildren: props =>
      cardContent.map((content, i) => (
        <Card.Content {...props} key={i}>
          {content}
        </Card.Content>
      )),
  },
};

export const Basic: Story = {
  args: {
    className: 'card-root-wrapper',
    ignoreHeader: false,
    renderChildren: props => (
      <>
        {HeaderOnly.args?.children}
        {ContentOnly.args?.renderChildren?.(props)}
      </>
    ),
  },
};
