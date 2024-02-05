import { Meta, StoryObj } from '@storybook/react';
import RectLoader from '.';

const meta = {
  title: 'Atoms/RectLoader',
  component: RectLoader,
  argTypes: {
    width: {
      control: { type: 'number' },
      defaultValue: 320,
      description: '横幅',
      table: {
        type: { summary: 'number' },
      },
    },
    height: {
      control: { type: 'number' },
      defaultValue: 320,
      description: '縦幅',
      table: {
        type: { summary: 'number' },
      },
    },
  },
} satisfies Meta<typeof RectLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  render: (args) => {
    return <RectLoader {...args} />;
  },
  args: {
    width: 320,
    height: 320,
  },
};
