import { EditPostCard, EditPostCardProps } from '@/features/post';
import { postCardMockImages } from '@/features/post/public-card/public-card.stories';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

/**
`EditPostModalCard` is a component that displays a modal window for editing a post.
The modal includes a form for post editing, a photo gallery (viewing only),
and the user’s avatar.
The user can submit changes to their post and close the modal
either via the "Close" button or through confirmation in a secondary modal.

### Key Features:
- Post editing form.
- Photo gallery for viewing images (no editing or selection functionality).
- Submit button for saving changes and closing the modal.
 */
const meta = {
  argTypes: {
    avatar: {
      control: { type: 'text' },
      description: 'URL of the user’s avatar or a static image import.',
    },
    userName: {
      control: { type: 'text' },
      description: 'The name of the user displayed in the modal header.',
    },
  },
  component: EditPostCard,
  decorators: [
    Story => (
      <div style={{ height: 'calc(100vh - 2rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'features/post/EditPostCard',
} satisfies Meta<typeof EditPostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const editPostFormProps: EditPostCardProps['editPostFormProps'] = {
  onSubmit: action('onSubmit'),
  onSubmitError: action('onSubmitError'),
  textLimit: 50,
};

export const Default: Story = {
  args: {
    avatar:
      'https://images.pexels.com/photos/27308308/pexels-photo-27308308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    editPostFormProps,
    images: postCardMockImages,
    userName: 'John Doe',
  },
};

export const WithoutAvatar: Story = {
  args: {
    ...Default.args,
    avatar: undefined,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    editPostFormProps: {
      ...editPostFormProps,
      // cSpell: disable-next-line
      description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, ut cumque. Illo deserunt neque quo quasi, sapiente aut quibusdam eaque doloremque itaque facilis architecto nesciunt reprehenderit. Eos omnis mollitia earum recusandae nulla. Cupiditate nihil sequi corrupti iste accusantium illo consequuntur ab reprehenderit. Temporibus, quidem atque consectetur rerum voluptate ullam ad modi ut nobis voluptatum reiciendis necessitatibus omnis animi sequi eveniet quod ratione excepturi voluptates, rem maiores culpa iste, cum odio natus! Obcaecati quia magnam pariatur natus nemo porro illum, eum eius accusamus esse reiciendis accusantium sapiente, unde voluptate inventore deleniti dolorem quo voluptatum. Aut dignissimos maxime quod fuga! Assumenda, nisi!`,
    },
  },
};
