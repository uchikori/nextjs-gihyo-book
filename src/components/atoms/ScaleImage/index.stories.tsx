import { Meta, StoryObj } from '@storybook/react';
import ScaleImage from '.';

const meta = {
  title: 'Atoms/ScaleImage',
  component: ScaleImage,
  argTypes: {
    src: {
      control: {
        type: 'text',
      },
      description: '画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    width: {
      control: {
        type: 'number',
      },
      defaultValue: 320,
      description: '画像の横幅',
      table: {
        type: { summary: 'number' },
      },
    },
    height: {
      control: {
        type: 'number',
      },
      defaultValue: 320,
      description: '画像の縦幅',
      table: {
        type: { summary: 'number' },
      },
    },
    containerWidth: {
      control: {
        type: 'number',
      },
      defaultValue: 320,
      description: '横幅',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    containerHeight: {
      control: {
        type: 'number',
      },
      defaultValue: 320,
      description: '縦幅',
      table: {
        type: { summary: 'number' },
      },
    },
  },
} satisfies Meta<typeof ScaleImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  render: (args) => {
    return <ScaleImage {...args} />;
  },
  args: {
    src: '/images/sample/1.jpg',
    alt: '',
  },
};
