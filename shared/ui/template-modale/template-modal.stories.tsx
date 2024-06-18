import { Button } from '@/shared/ui/Button';
import * as CardStories from '@/shared/ui/card/card.stories';
import * as ModalCardStories from '@/shared/ui/modal-card/modal-card.stories';
import { Meta, StoryObj } from '@storybook/react';

import { ModalCard } from '../modal-card';
import { TemplateModal } from './index';

/**
 * The TemplateModal component provides a flexible dialog box functionality in React,
 * utilizing Radix for styling and behavior. It supports features like a customizable title,
 * trigger element, and children content, making it easy to create interactive dialog interfaces with ease.
 */
const meta = {
  argTypes: {
    children: {
      control: false,
      description: 'description for Modal Dialog',
    },
    trigger: { control: false },
  },
  component: TemplateModal,
  decorators: [CardStories.commonDecorator],
  tags: ['autodocs'],
  title: 'UI/TemplateModal',
} satisfies Meta<typeof TemplateModal>;

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
