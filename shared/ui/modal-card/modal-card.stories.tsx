import * as CardStories from '@/shared/ui/card/card.stories';
import { Dialog } from '@radix-ui/react-dialog';
import { Meta, StoryObj } from '@storybook/react';

import { ModalCard, ModalCardSlot } from './modal-card';

const CardStoriesArgTypes = CardStories.default.argTypes;

/**
 * A handy component based on the [Card](/docs/ui-card--docs) common component.
 * It contains the required text header with a close button.
 *
 * The `ModalCard` component includes an additional service component `ModalCard.Content`,
 * which is just a wrapper for the `ModalCard` content. It completely copies `Card.Content`
 * from the [Card](/docs/ui-card--docs) component.
 *
 * __IMPORTANT:__ The internal component `CloseIcon` is wrapped by `DialogClose`
 * provided by [Radix](https://www.radix-ui.com/primitives/docs/components/dialog) library.
 * Therefore `ModalCard` can be used only as a child of `Dialog` component from [Radix](https://www.radix-ui.com/primitives/docs/components/dialog).
 * That is, `ModalCard` is assumed to be an integral part of custom modal windows.
 * It is not intended to be used as is.
 */
const meta = {
  argTypes: {
    children: CardStoriesArgTypes.children,

    classes: {
      description: `An object containing the names of the classes corresponding to the
        component slots. Provided classnames will be merged with default slots classnames.`,
      table: {
        defaultValue: { summary: '{}' },
        type: {
          detail: `Partial<${JSON.stringify(
            {
              cardRoot: 'string',
              closeButton: 'string',
              header: 'string',
              title: 'string',
            } satisfies Record<ModalCardSlot, string>,
            null,
            2
          )}>`,
          summary: 'ModalCardClasses',
        },
      },
    },

    disabled: {
      description: `When \`true\`, prevents the user from interacting with the close button.
        CSS-property \`pointer-events: none\` is set in this case.`,
      table: { type: { summary: 'boolean' } },
    },

    headerTitle: {
      description: `The title specified in the header section of the card. The html tag \`h2\`
        is used internally. The header is truncated with a ellipsis if it exceeds the width of the card.`,
      table: { type: { summary: 'string' } },
    },

    onClose: {
      control: 'action',
      description: 'Event handler called when the user clicks on the close icon',
      table: { type: { summary: '() => void' } },
    },

    ref: CardStoriesArgTypes.ref,
  },
  component: ModalCard,
  decorators: [
    Story => (
      // wrap `ModalCard` in `Dialog` to avoid the missing context provider error in `CloseDialog`.
      <Dialog>
        <Story />
      </Dialog>
    ),
    CardStories.commonDecorator,
  ],
  tags: ['autodocs'],
  title: 'UI/ModalCard',
} satisfies Meta<typeof ModalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: CardStories.cardContent.map((content, i) => (
      <ModalCard.Content key={i}>{content}</ModalCard.Content>
    )),
    classes: { cardRoot: 'card-content' },
    disabled: false,
    headerTitle: 'Pretty Header',
  },
};

export const Empty: Story = {
  args: {
    ...Basic.args,
    children: undefined,
  },
};

export const LongHeader: Story = {
  args: {
    ...Basic.args,
    // cSpell: disable-next-line
    headerTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, incidunt.',
  },
};
