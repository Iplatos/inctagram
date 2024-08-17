import { ElementRef, ForwardedRef, ReactNode } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { Replace } from '@/shared/types/helpers';
import { IconButton } from '@/shared/ui/IconButton';
import * as CardStories from '@/shared/ui/card/card.stories';
import { Typography } from '@/shared/ui/typography';
import * as Dialog from '@radix-ui/react-dialog';
import { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

import styles from './modal-card.module.scss';

import { ModalCard, ModalCardContentProps, ModalCardProps } from './modal-card';

const CardStoriesArgTypes = CardStories.default.argTypes;

type PartialModalCardContentProps = Pick<ModalCardContentProps, 'ignoreHeader'>;

type CustomRenderProps = PartialModalCardContentProps &
  Replace<
    ModalCardProps,
    {
      children?: undefined;
      disabled?: boolean;
      headerTitle: string;
      renderChildren: ({ ignoreHeader }: PartialModalCardContentProps) => ReactNode;
    }
  >;

export const CustomRender = ({
  disabled,
  headerTitle,
  ignoreHeader,
  renderChildren,
  ...props
}: CustomRenderProps) => (
  <ModalCard.Root {...props}>
    <ModalCard.Header>
      <Typography.H2 className={styles.headerTitle}>{headerTitle}</Typography.H2>
      <Dialog.Close asChild>
        <IconButton className={styles.headerIconButtonLast} disabled={disabled} size={'medium'}>
          <CloseIcon />
        </IconButton>
      </Dialog.Close>
    </ModalCard.Header>
    {renderChildren({ ignoreHeader })}
  </ModalCard.Root>
);

/**
 * A handy component based on the [Card](/docs/ui-card--docs) common component.
 * It completely copies the behavior and features of `Card` while providing several service
 * classes to reduce code duplication in different modal window variations.
 * To access these service classes, you must import the `ModalCard` component's CSS module
 * at the path `@/shared/ui/modal-card/modal-card.module.scss`. Service classes:
 * * `headerIconButton` class contains styles for embedded `IconButtons`.
 * For example, for `hover` and `active` states.
 * * `headerIconButtonLast` duplicates the styles of the preceding class.
 * Separates the leftmost button from the neighboring element.
 * * `headerTitle` class contains styles for a template header for modal windows.
 * Includes trimming of too long string.
 * * `contentScrollable` adds the `overflow: auto` CSS property as well as a stylized scrollbar.
 * __Important!__ To display the scrollbar, you must explicitly limit the height of the ancestor tag
 * of the current tag to which this class is applied.
 *
 * The `ModalCard` component includes additional service components `ModalCard.Content`
 * and `ModalCard.Header`, which are wrappers for `Card.Content` and `Card.Header` respectively.
 * They completely copy the behavior of the `Card` compound components.
 */
const meta = {
  argTypes: {
    children: CardStoriesArgTypes.children,
    className: CardStoriesArgTypes.className,
    headerTitle: {
      description: `STORYBOOK_SPECIFIC_SETTING: The title specified in the header section of the card. The html tag \`h2\`
        is used internally. The header is truncated with a ellipsis if it exceeds the width of the card.`,
      table: { type: { summary: 'string' } },
    },

    ignoreHeader: CardStoriesArgTypes.ignoreHeader,

    ref: CardStoriesArgTypes.ref,
  },
  decorators: [
    Story => (
      // wrap `ModalCard` in `Dialog` to avoid the missing context provider error in `CloseDialog`.
      <Dialog.Root>
        <Story />
      </Dialog.Root>
    ),
    CardStories.commonDecorator,
    Story => (
      <>
        <Typography.Regular16 className={'description'} component={'p'}>
          <Typography.Bold16>TIP:</Typography.Bold16> The <em>.card-max-height</em> class name is
          attached to the <em>ModalCard.Root</em> component to show the default styles for the
          component&apos;s scroll.
        </Typography.Regular16>
        <Story />
      </>
    ),
  ],
  excludeStories: ['CustomRender'],
  render: CustomRender,
  tags: ['autodocs'],
  title: 'UI/ModalCard',
  // manually add the `ref` type to the `CustomRenderProps` to add its description to the `meta` object.
} satisfies Meta<CustomRenderProps & { ref?: ForwardedRef<ElementRef<'div'>> }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    className: clsx('card-root-wrapper', 'card-max-height'),
    headerTitle: 'Pretty Header',
    ignoreHeader: false,
    renderChildren: props =>
      CardStories.cardContent.map((element, i) => {
        const isLastContentItem = element.key === 'long';

        return (
          <ModalCard.Content
            className={isLastContentItem ? styles.contentScrollable : undefined}
            {...props}
            key={i}
          >
            {element}
          </ModalCard.Content>
        );
      }),
  },
};

export const HeaderOnly: Story = {
  args: {
    ...Basic.args,
    renderChildren: () => null,
  },
};

export const LongHeader: Story = {
  args: {
    ...Basic.args,
    // cSpell: disable-next-line
    headerTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, incidunt.',
  },
};
