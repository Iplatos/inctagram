import type { Meta, StoryObj } from '@storybook/react';

import { AgreementContent } from './agreement-content';

const meta = {
  argTypes: {
    privacyPolicy: {
      control: 'boolean',
    },
    termsOfService: {
      control: 'boolean',
    },
  },
  component: AgreementContent,
  tags: ['autodocs'],
  title: 'Auth/AgreementContent',
} satisfies Meta<typeof AgreementContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrivacyPolicy: Story = {
  args: {
    privacyPolicy: true,
  },

  render: args => {
    return <AgreementContent {...args} />;
  },
};

export const TermsOfService: Story = {
  args: {
    termsOfService: true,
  },

  render: args => {
    return <AgreementContent {...args} />;
  },
};
