import { Button } from '@/shared/ui/Button';
import * as CardStories from '@/shared/ui/card/card.stories';
import { ModalCard } from '@/shared/ui/modal-card';
import * as ModalCardStories from '@/shared/ui/modal-card/modal-card.stories';
import { Meta, StoryObj } from '@storybook/react';

import { Modal, ModalSlot } from './index';
import { ModalContentProps } from './modal-content.stories';
import { ModalPortalProps } from './modal-portal.stories';

/**
 * The `Modal` component provides a flexible dialog box functionality,
 * making it easy to create interactive dialog interfaces.
 * The component inherits almost all features and props of `Radix.Dialog` from [Radix](https://www.radix-ui.com/primitives/docs/components/dialog#root) except "modal/dialog" modes
 * (`Modal` component assumes only use in `'modal'` mode, so `modal` prop is omitted).
 *
 * It can be used both in controlled and uncontrolled modes:
 * * _Uncontrolled mode:_ pass a `trigger` prop of type `ReactNode`, clicking on which toggles the display of `Modal`.
 * The passed component will be wrapped in `DialogPrimitive.Trigger`.
 * * _Controlled mode:_ supply the component with the `open` and `onOpenChange` props for more detailed control over the behavior of the modal window.
 */
const meta = {
  argTypes: {
    children: {
      control: false,
      description:
        'Any arbitrary `ReactNode` component which will be wrapped in `DialogPrimitive.Content`.',
      table: { type: { summary: 'ReactNode' } },
    },

    classes: {
      description: `An object containing the names of the classes corresponding to the
        component slots. Provided classnames will be merged with default slots classnames.`,
      table: {
        defaultValue: { summary: '{}' },
        type: {
          detail: `Partial<${JSON.stringify(
            {
              content: 'string',
              overlay: 'string',
            } satisfies Record<ModalSlot, string>,
            null,
            2
          )}>`,
          summary: 'ModalClasses',
        },
      },
    },

    contentProps: {
      description: `Props object to be passed to the internal \`DialogPrimitive.Content\`.\t
        Inherits almost all props of the \`DialogPrimitive.Content\`.`,
      table: {
        type: {
          detail: `Partial<${JSON.stringify(
            {
              /* eslint-disable perfectionist/sort-objects -- set the order of properties manually for better readability */
              forceMount: 'boolean',
              onOpenAutoFocus: '(event: Event) => void',
              onCloseAutoFocus: '(event: Event) => void',
              onEscapeKeyDown: '(event: Event) => void',
              onPointerDownOutside: '(event: PointerDownOutsideEvent) => void',
              onInteractOutside: '(event: React.FocusEvent | MouseEvent | TouchEvent) => void',
              /* eslint-enable perfectionist/sort-objects */
            } satisfies Partial<Record<keyof ModalContentProps, string>>,
            null,
            2
          )}>`,
          summary: 'Omitted<ModalContentProps>',
        },
      },
    },

    contentRef: {
      control: false,
      description: 'The ref is forwarded to the inner `DialogPrimitive.Content` element.',
      table: { type: { summary: 'ForwardedRef<HTMLDivElement>' } },
    },

    defaultOpen: {
      description: `The open state of the dialog when it is initially rendered.
      Use when you do not need to control its open state.`,
      table: { type: { summary: 'boolean' } },
    },

    onOpenChange: {
      description: `Event handler called when the open state of the dialog changes.`,
      table: { type: { summary: '(open: boolean) => void' } },
    },

    open: {
      description:
        'The controlled open state of the dialog. Must be used in conjunction with `onOpenChange`.',
      table: { type: { summary: 'boolean' } },
    },

    overlayRef: {
      control: false,
      description: 'The ref is forwarded to the inner `DialogPrimitive.Overlay` element.',
      table: { type: { summary: 'ForwardedRef<HTMLDivElement>' } },
    },

    portalProps: {
      description: `Props object to be passed to the internal \`DialogPrimitive.Portal\`.
        Inherits almost all props of the \`DialogPrimitive.Portal\`.`,
      table: {
        type: {
          detail: `Partial<${JSON.stringify(
            { container: 'HTMLElement', forceMount: 'boolean' } satisfies Partial<
              Record<keyof ModalPortalProps, string>
            >,
            null,
            2
          )}>`,
          summary: 'ModalPortalProps',
        },
      },
    },

    trigger: {
      control: false,
      description: `React node to be placed inside \`DialogPrimitive.Trigger\` for use in uncontrolled mode.\t
      __IMPORTANT:__ The trigger component does not fit inside \`Portal\`
      inside the \`Modal\` component, unlike the contents of a modal window.
      Consequently, the trigger retains its position in the markup of the surrounding JSX
      as if it were not part of the modal window but existed independently of it. `,
    },

    triggerRef: {
      control: false,
      description: 'The ref is forwarded to the inner `DialogPrimitive.Trigger` element.',
      table: { type: { summary: 'ForwardedRef<HTMLButtonElement>' } },
    },
  },
  component: Modal,
  decorators: [CardStories.commonDecorator],
  title: 'UI/Modal',
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicModalCard: Story = {
  args: {
    children: <ModalCard {...ModalCardStories.Basic.args} />,
    trigger: <Button>Open Modal</Button>,
  },
};

export const EmptyModalCard: Story = {
  args: {
    ...BasicModalCard.args,
    children: <ModalCard {...ModalCardStories.Empty.args} />,
  },
};

export const ModalCardWithLongHeader: Story = {
  args: {
    ...BasicModalCard.args,
    children: <ModalCard {...ModalCardStories.LongHeader.args} />,
  },
};
