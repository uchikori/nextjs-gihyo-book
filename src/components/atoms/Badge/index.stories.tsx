import { Meta, StoryObj } from '@storybook/react';
import Badge from '.';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
      description: 'バッジのテキスト',
      table: {
        type: { summary: 'text' },
      },
    },
    backgroundColor: {
      control: {
        type: 'color',
      },
      description: 'バッジの色',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Orange: Story = {
  render: (args) => {
    return <Badge {...args} />;
  },
  args: {
    content: '1',
    backgroundColor: '#ed9f28',
  },
};

export const Green: Story = {
  render: (args) => {
    return <Badge {...args} />;
  },
  args: {
    content: '1',
    backgroundColor: '#32bf00',
  },
};

export const Red: Story = {
  render: (args) => {
    return <Badge {...args} />;
  },
  args: {
    content: '1',
    backgroundColor: '#d4001a',
  },
};
