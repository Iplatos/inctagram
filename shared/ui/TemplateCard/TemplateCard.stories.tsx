import { Meta, StoryObj } from '@storybook/react';

import { Typography } from '../typography';
import { TemplateCard } from './TemplateCard';

const meta = {
  component: TemplateCard,
  tags: ['autodocs'],
  title: 'Components/TemplateCard',
} satisfies Meta<typeof TemplateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: args => {
    return (
      <TemplateCard>
        <TemplateCard.Header>
          <Typography.H1>Header</Typography.H1>
        </TemplateCard.Header>
        <TemplateCard.Content>Content 1</TemplateCard.Content>
        <TemplateCard.Content>Content 2</TemplateCard.Content>
        <TemplateCard.Content>Content 3</TemplateCard.Content>
      </TemplateCard>
    );
  },
};
