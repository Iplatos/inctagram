import { Meta, StoryObj } from '@storybook/react';

import { UiSidebar } from './sidebar';

const meta: Meta = {
  component: UiSidebar.Root,
  decorators: [
    Story => (
      <div
        style={{
          minHeight: '600px',
          minWidth: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'The `Section` component is used to group related `Item` components within the sidebar.',
      },
    },
  },
  // subcomponents: {
  //   Footer: UiSidebar.Footer,
  //   Item: UiSidebar.Item,
  //   Section: UiSidebar.Section,
  // },
  tags: ['autodocs'],
  title: 'Ui/Sidebar',
};

export default meta;

// Root Story
type RootStory = StoryObj<typeof UiSidebar.Root>;

export const Default: RootStory = {
  args: {
    children: (
      <>
        <UiSidebar.Section>
          <UiSidebar.Item icon={<span>📂</span>} title={'Item 1 - Section 1'} />
          <UiSidebar.Item icon={<span>📂</span>} title={'Item 2 - Section 1'} />
        </UiSidebar.Section>
        <UiSidebar.Section>
          <UiSidebar.Item icon={<span>📂</span>} title={'Item 1 - Section 2'} />
          <UiSidebar.Item icon={<span>📂</span>} title={'Item 2 - Section 2'} />
        </UiSidebar.Section>
        <UiSidebar.Footer>Footer Content</UiSidebar.Footer>
      </>
    ),
  },
  render: ({ children }) => <UiSidebar.Root>{children}</UiSidebar.Root>,
};

// Descriptions for subcomponents
Default.parameters = {
  docs: {
    description: {
      story: 'This is the default layout of the `UiSidebar` component with two items and a footer.',
    },
  },
};

// Section Story
type SectionStory = StoryObj<typeof UiSidebar.Section>;

export const SectionExample: SectionStory = {
  args: {
    children: (
      <>
        <UiSidebar.Item icon={<span>📂</span>} title={'Section Item 1'} />
        <UiSidebar.Item icon={<span>📂</span>} title={'Section Item 2'} />
      </>
    ),
  },
  render: ({ children }) => <UiSidebar.Section>{children}</UiSidebar.Section>,
};

SectionExample.parameters = {
  docs: {
    description: {
      story:
        'The `Section` component is used to group related `Item` components within the sidebar.',
    },
  },
};

// Item Story
type ItemStory = StoryObj<typeof UiSidebar.Item>;

export const ItemExample: ItemStory = {
  args: {
    icon: <span>📂</span>,
    title: 'Example Item',
  },
  render: args => <UiSidebar.Item {...args} />,
};

ItemExample.parameters = {
  docs: {
    description: {
      story:
        'The `Item` component represents a clickable item in the sidebar with an optional icon and title.',
    },
  },
};

// Footer Story
type FooterStory = StoryObj<typeof UiSidebar.Footer>;

export const FooterExample: FooterStory = {
  args: {
    children: 'Footer Content',
  },
  render: ({ children }) => <UiSidebar.Footer>{children}</UiSidebar.Footer>,
};

FooterExample.parameters = {
  docs: {
    description: {
      story:
        'The `Footer` component is used to display footer content at the bottom of the sidebar.',
    },
  },
};
